// import { extend } from "joi";

export interface IGlobalErrorHandler {
  message: string;
  name: string;
  statusCode: number;
  operational: boolean;
  type: string;
}
export class GlobalErrorHandler extends Error {
  statusCode;
  operational;
  type;
  constructor(
    name: string,
    msg: string,
    statusCode: number,
    operational: boolean,
    type: string
  ) {
    super(name);
    this.message = msg;
    this.name = name;
    this.statusCode = statusCode;
    this.operational = operational;
    this.type = type;
  }
}
