import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  static async register(req: Request, res: Response) {
    const result = await AuthService.register(req.body);
    return res.status(200).json(result);
  }

  static async login(req: Request, res: Response) {
    const result = await AuthService.login(req.body);
    return res.status(200).json(result);
  }
}