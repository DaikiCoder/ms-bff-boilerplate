/* eslint-disable @typescript-eslint/no-explicit-any */

import { DecoratorData } from '../decorators/types.decorators';

export interface HttpApplication {
  addCtrls(ctrls: HttpController, httpDecoratorData: DecoratorData): void;
  listen(port: number): void;
}

export interface HttpController {
  controllers: any[];
}

export const enum HttpTypes {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface GenericResponse {
  success: boolean,
  data?: object,
  error?: GenericErrorResponse
}

export interface GenericErrorResponse {
  code: number,
  message: string
}