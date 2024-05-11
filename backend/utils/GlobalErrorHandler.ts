// import { extend } from "joi";

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
