import { ExtractJwt, Strategy } from "passport-jwt";
import passport, { Passport } from "passport";
import AuthToken from "passport-auth-token";
import { getPrisma } from "./../db/prisma";
import { verify } from "jsonwebtoken";

import config from "./../config";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.SECRET_KEY,
};

passport.use(
  "jwt-or-x-access-token",
  new AuthToken(
    { headerFields: ["authorization", "x-access-token"] },
    async (token, done) => {
      const isJwtToken = token.includes("Bearer");
      const parsedToken = isJwtToken ? token.split(" ")[1] : token;
      const prisma = await getPrisma();

      try {
        if (isJwtToken) {
          const jwtPayload = verify(parsedToken, config.jwt.SECRET_KEY);
          const user = await prisma.user.findUnique({
            where: { id: jwtPayload.sub as string },
          });

          if (!user) return done(null, false);

          return done(null, user);
        }
      } catch (err) {
        return done(null, false);
      }
    },
  ),
);

passport.use(
  "jwt",
  new Strategy(options, async (jwtPayload, done) => {
    const prisma = await getPrisma();
    const user = await prisma.user.findUnique({
      where: { id: jwtPayload.sub },
    });

    if (!user) return done(null, false);

    return done(null, user);
  }),
);

export default passport;
