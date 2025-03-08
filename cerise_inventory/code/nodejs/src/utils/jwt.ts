import { sign } from "jsonwebtoken";
import config from "../config";

const generateJWT = (id: string) => {
  const expiresIn = config.jwt.TOKEN_EXPIRES_IN;
  const payload = {
    sub: id,
    iat: Math.floor(Date.now() / 1000),
  };

  const signedToken = sign(payload, config.jwt.SECRET_KEY, { expiresIn });

  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
};

export default generateJWT;
