import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { sql } from "../db";
import type { TRole } from "../types/user";


const auth = (...roles: TRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: Token Verification
      const token = req.headers.authorization;

      if (!token) {
        return sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "Unauthorized Access!!",
        });
      }
      
      const decoded = jwt.verify(token as string, config.jwt_secret_key as string) as JwtPayload;

      // TODO: User Verification
      const userVerify = await sql`SELECT id, email, name, role, created_at, updated_at FROM users WHERE id = ${decoded.id}
      `;

      const user = userVerify[0];

      if (!user) {
        return sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "User Not Found!!",
        });
      }

      // TODO: Role Verification
      if (roles.length > 0 && !roles.includes(user.role as TRole)) {
        return sendResponse(res, {
          statusCode: 403,
          success: false,
          message: "Forbidden Access!!",
        });
      }

      req.user = user;
      
      next();
    } catch (error: any) {
      next(error);
    }
  };
}


export default auth;