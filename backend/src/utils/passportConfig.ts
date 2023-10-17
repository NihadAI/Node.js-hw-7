import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Container from "typedi";
import UsersService from "../bll/Users.service";
import bcrypt from "bcrypt"

export default function init() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        const userService = Container.get(UsersService);
        const user = await userService.getUserByEmail(email);
        if (!user) {
          return done(
            {
              errors: { "email or password": "is invalid" },
            },
            false
          );
        }
        const isValid = await bcrypt.compare(password, user.password); 
        if (!isValid) {
          return done(
            {
              errors: { "email or password": "is invalid" },
            },
            false
          );
        }
        return done(null, user);
      }
    )
  );
}
