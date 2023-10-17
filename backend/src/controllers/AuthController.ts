import express from "express";
import { Service } from "typedi";
import UsersService from "../bll/Users.service";
import passport from "passport"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import auth from "../middleware/passportMiddleware";
import Ajv from 'ajv';
import addFormats  from 'ajv-formats';
import usersSchema from "../models/usersSchema";
import { ValidationError } from "../utils/customError";
import convictConfig from "../utils/convictConfig";

@Service()
class AuthController {
  private privateKey = convictConfig.get('SECRET_KEY');
  private router: express.Router;
  private postValidator: any;

  constructor(private usersService: UsersService) {
    this.router = express.Router(); 
    this.initializeValidators()
    this.initializeRoutes();
  }

  private initializeValidators() {
    const ajv = new Ajv({allErrors: true})
    addFormats(ajv)
    this.postValidator = ajv.compile(usersSchema)
  
  }

  private initializeRoutes() {
    this.router.post("/auth/register", auth.optional, this.registerJWT);
    this.router.post("/auth/login", auth.optional, this.loginPass);
  }

  loginPass = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    passport.authenticate(
      "local",
      { session: false },
      (err: any, passportUser: any, info: any) => {
        if (err) {
          return next(err);
        }

        if (passportUser) {
          const user = passportUser;

          user.token = jwt.sign(
            { user_id: user.id, email: user.email },
            this.privateKey,
            {
              expiresIn: "2h",
            }
          );

          user.password = "";
          response.cookie('Token', user.token,
          { maxAge: 900000})
  
          return response.json({ user });
        }

        return response.status(400).send(info);
      }
    )(request, response, next);
  };


  registerJWT = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { email, password, confirmPassword } = request.body;
      const oldUser = await this.usersService.getUserByEmail(email);

      if (password !== confirmPassword) {
        return response.status(409).send("Passwords are not mutch!");
      }

      if (oldUser) {
        return response.status(409).send("User Already Exist. Please Login!");
      }
      const isValid = this.postValidator({ email, password, confirmPassword}); 

      if (!isValid) {
        throw new ValidationError({name: "ValidationError", message: this.postValidator.errors.map((e: { message: string; }) => e.message)});
      }
      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await this.usersService.createAUser({
        id: 0,
        email: email,
        password: encryptedPassword,
      });

      const token = jwt.sign({ user_id: user.id, email }, this.privateKey, {
        expiresIn: "2h",
      });

      user.password = "";

      response.send({ ...user, token });
    } catch (error) {
      next(error)
    }
  }
}

export default AuthController;
