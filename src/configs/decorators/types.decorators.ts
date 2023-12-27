/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpTypes } from "../http/types.factory";

export interface IModule {
  controller: any[];
}

export interface IController {
  new (): any;
}

export interface DecoratedController {
  ctrlClassName: string | undefined;
  crtlBasePath?: string;
  ctrlFunctions: DecoratedFunc[];
}

export interface DecoratedFunc {
  name: string | symbol;
  type: HttpTypes;
  url: string;
  func: any;
  paramNames?: string[];
}

export interface DecoratorData {
  controllers: DecoratedController[];
}
