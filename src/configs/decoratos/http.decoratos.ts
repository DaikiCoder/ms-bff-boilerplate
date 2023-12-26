/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpTypes } from '../http/HttpFactory';

interface IController {
  new (): any;
}

interface IModule {
  controller: IController[];
}

interface DecoratedController {
  ctrlClassName: string | undefined;
  crtlBasePath?: string;
  ctrlFunctions: HttpDecoratedFunc[];
}

interface HttpDecoratedFunc {
  name: string | symbol;
  type: HttpTypes;
  url: string;
  func: any;
  paramNames?: string[];
}

export interface HttpDecoratorData {
  controllers: DecoratedController[];
}

export const httpDecoratedData: HttpDecoratorData = {
  controllers: new Array<DecoratedController>(),
};

export const functionList: HttpDecoratedFunc[] = Array<HttpDecoratedFunc>();

export function Module(input: IModule) {
  console.log('D_Module input: ', input);
  console.log('D_Module controller: ', input.controller);
  return function moduleClass(target: new () => void, _context: ClassDecoratorContext) {
    console.log('D_Module target: ', target);
    console.log('D_Module context: ', _context);
    
    // const initializedControllers = input.controller.map(controller => new controller());
    target.prototype.controllers = input.controller;
    /* httpDecoratorData.controllers = input.controller.map((controller) => controller.name); */
  };
}

export function Controller(basePath?: string) {
  return function controllerClass(target: new () => void, context: ClassDecoratorContext) {

    const decoratedController: DecoratedController = {
      ctrlClassName: context.name,
      crtlBasePath: basePath,
      ctrlFunctions: [...functionList],
    };

    httpDecoratedData.controllers?.push(decoratedController);

    functionList.splice(0, functionList.length);
  };
}

export function Get(url: string) {
  console.log(`D_Get - url: ${url}`);
  const paramsRegex = /:(\w+)/g;
  const urlParams: string[] = (url.match(paramsRegex) || []).map((match) => match.substring(1));
  console.log(`D_Get - urlParams: ${urlParams}`);
  
  return function getMethod(target: any, context: ClassMethodDecoratorContext) {
    console.log('D_Get target: ', target.toString());
    console.log('D_Get context: ', context);

    // Obtener los nombres de los parámetros del método original
    const paramNames: string[] = getParameterNames(target);
    console.log(`D_Get - paramNames: ${paramNames}`);

    const httpDecoratedFunc: HttpDecoratedFunc = {
      name: context.name,
      type: HttpTypes.GET,
      url: url,
      func: target,
      paramNames: paramNames
    };

    functionList.push(httpDecoratedFunc);

    function newMethod(this: any, ...args: any[]) {
      console.log('D_Get args: ', args);
      // Validar que todos los urlParams estén presentes en args
      const allParamsPresent = urlParams.every((param) => paramNames.includes(param));

      if (!allParamsPresent) {
        const missingParams = urlParams.filter((param) => !paramNames.includes(param));
        throw new Error(`Missing URL parameters: ${missingParams.join(', ')}`);
      }

      // Validar que no haya parámetros adicionales en args
      if (urlParams.length !== args.length) {
        const additionalParams = paramNames.filter((param) => !urlParams.includes(param));
        throw new Error(`Unexpected additional parameters in args: ${additionalParams.join(', ')}`);
      }

      return target.apply(this, ...args);
    }

    return newMethod;
  };
}

function getParameterNames(func: () => void) {
  const funcStr = func.toString();
  const argNamesMatch = funcStr
    .slice(funcStr.indexOf('(') + 1, funcStr.indexOf(')'))
    .match(/([^\s,]+)/g);
  return argNamesMatch ? argNamesMatch : [];
}

/* export function debugMethod(input: string) {
  return function debugMethod(originalMethod: any, _context: any) {
    function replacementMethod(this: any, ...args: any[]) {
      const now = new Date(Date.now());
      console.log('start time', now.toISOString());
      const result = originalMethod.call(this, ...args);
      const end = new Date(Date.now());
      console.log('end time', end.toISOString());
      return result;
    }
    return replacementMethod;
  }
}

export function loggedMethod(originalMethod: any, _context: any) {
  function replacementMethod(this: any, ...args: any[]) {
      console.log("LOG: Entering method.")
      const result = originalMethod.call(this, ...args);
      console.log("LOG: Exiting method.")
      return result;
  }
  return replacementMethod;
} */

/* https://blog.logrocket.com/practical-guide-typescript-decorators/
type Decorator = (target: Input, context: {
  kind: string;
  name: string | symbol;
  access: {
    get?(): unknown;
    set?(value: unknown): void;
  };
  private?: boolean;
  static?: boolean;
  addInitializer?(initializer: () => void): void;
}) => Output | void;

type ClassDecorator = (value: Function, context: {
  kind: "class"
  name: string | undefined
  addInitializer(initializer: () => void): void
}) => Function | void

type ClassMethodDecorator = (target: Function, context: {
  kind: "method"
  name: string | symbol
  access: { get(): unknown }
  static: boolean
  private: boolean
  addInitializer(initializer: () => void): void
}) => Function | void

type ClassPropertyDecorator = (target: undefined, context: {
  kind: "field"
  name: string | symbol
  access: { get(): unknown, set(value: unknown): void }
  static: boolean
  private: boolean
}) => (initialValue: unknown) => unknown | void

type ClassSetterDecorator = (target: Function, context: {
  kind: "setter"
  name: string | symbol
  access: { set(value: unknown): void }
  static: boolean
  private: boolean
  addInitializer(initializer: () => void): void
}) => Function | void

type ClassGetterDecorator = (value: Function, context: {
  kind: "getter"
  name: string | symbol
  access: { get(): unknown }
  static: boolean
  private: boolean
  addInitializer(initializer: () => void): void
}) => Function | void */

/* import { Request, Response } from "express";
import { httpInstance } from "../http/HttpFactory";
import AppController from "../../controllers/AppController";

interface IModule {
  controllers: object[];
}
export function Module(target: any) {
  return () => {
    return target
  }
} */

/* export function Get(url: string) {
  console.log('Decorator Get Factory!');
  const paramsRegex = /:(\w+)/g;
  const urlParams: string[] = (url.match(paramsRegex) || []).map(match => match.substring(1));

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    console.log('Decorator Get!');
    const originalMethod = descriptor.value;

    // Obtener los nombres de los parámetros del método original
    const paramNames: string[] = getParameterNames(originalMethod);
    console.log('httpInstance: ', httpInstance);

    descriptor.value = function (...args: any[]) {
      console.log('Decorator Get Descriptor!!', args);
      // Validar que todos los urlParams estén presentes en args
      const allParamsPresent = urlParams.every(param => (paramNames).includes(param));

      if (!allParamsPresent) {
        const missingParams = urlParams.filter(param => !(paramNames).includes(param));
        throw new Error(`Missing URL parameters: ${missingParams.join(', ')}`);
      }

      // Validar que no haya parámetros adicionales en args
      if (urlParams.length !== args.length) {
        const additionalParams = paramNames.filter(param => !urlParams.includes(param));
        throw new Error(`Unexpected additional parameters in args: ${additionalParams.join(', ')}`);
      }

      httpInstance.router.get('/health', async (req: Request, res: Response) => {
        console.log('/health');
        // originalMethod();
        res.status(200);
        res.send("asd");
      });

      // Llamar al método original
      return originalMethod.apply(this, args);
    };
  };
}


export function Post(url: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    console.log(`url: ${url}`);
    console.log(`target: ${JSON.stringify(target)}`);
    console.log(`propertyKey: ${JSON.stringify(propertyKey)}`);
    console.log(`descriptor: ${descriptor}`);
  };
}

export function uppercase(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log('args: ', args);
    const result = originalMethod.apply(this, args);

    if (typeof result === "string") {
       return result.toUpperCase();
    }

    return result;
  };

  return descriptor;
}

export function debugMethod(originalMethod: any, _context: any) {
  function replacementMethod(this: any, ...args: any[]) {
    const now = new Date(Date.now());
    console.log('start time', now.toISOString());
    const result = originalMethod.call(this, ...args);
    const end = new Date(Date.now());
    console.log('end time', end.toISOString());
    return result;
  }
  return replacementMethod;
}


function getParameterNames(func: ()=> void) {
  const funcStr = func.toString();
  const argNamesMatch = funcStr.slice(funcStr.indexOf('(') + 1, funcStr.indexOf(')')).match(/([^\s,]+)/g);
  return argNamesMatch ? argNamesMatch : [];

} */
