import { NextFunction, Response, Request } from "express";
import { CustomErrorHandler } from "../errors/errorHandler";

export const errorHandler = (err: CustomErrorHandler, req: Request, res: Response, next: NextFunction) => {
	console.log(err)
	res.status(err.status).json(err.getErrorInfo())
}