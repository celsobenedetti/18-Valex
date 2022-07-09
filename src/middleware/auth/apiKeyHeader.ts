import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../../common/exceptions/http-exceptions";
import { findByApiKey } from "../../repositories/companyRepository";

export default async function validadeApiKeyHeader(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.headers["x-api-key"] as string;
  if (!apiKey) throw new UnauthorizedException("API key is required");

  const company = await findByApiKey(apiKey);
  if (!company) throw new UnauthorizedException("Invalid API key");

  res.locals.company = company;

  next();
}
