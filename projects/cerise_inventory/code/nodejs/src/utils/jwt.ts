import { sign } from "jsonwebtoken";
import config from "../config";

const generateJWT = (id: string) => {
  const expiresIn: string = config.jwt.TOKEN_EXPIRES_IN;
  const payload: any = {
    sub: id,
    iat: Math.floor(Date.now() / 1000),
  };

  const signedToken: any = sign(
    payload as any,
    config.jwt.SECRET_KEY as string,
    { expiresIn: "1d" }
  );

  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
};

export default generateJWT;
