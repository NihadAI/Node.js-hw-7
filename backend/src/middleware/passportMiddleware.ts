import { expressjwt } from "express-jwt";
import convictConfig from "../utils/convictConfig";
import { HttpCode, ValidationError } from "../utils/customError";

const getTokenFromHeaders = (req: any) => {
  const {
    headers: { authorization },
  } = req;

  if (authorization && authorization.split(" ")[0] === "Token") {
    return authorization.split(" ")[1];
  }
  return null;
};

const auth = {
  required: (req: any, res: any, next: any) => {
    expressjwt({
      secret: convictConfig.get('SECRET_KEY'),
      getToken: getTokenFromHeaders,
      algorithms: ['HS256'],
    })(req, res, (err: any) => {
      if (err) {
        next(new ValidationError({ message: 'Unauthorized', httpCode: HttpCode.UNAUTHORIZED }));
      } else {
        next(err);
      }
    });
  },
  optional: expressjwt({
    secret: convictConfig.get("SECRET_KEY"),
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
    algorithms: ["HS256"],
  }),
};

export default auth;
