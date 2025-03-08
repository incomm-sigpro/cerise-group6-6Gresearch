import { getPrisma } from "./db/prisma";
import cors from "cors";
import express from "express";
import { NextFunction, Request, Response } from "express";
import passport from "./utils/passport";
import router from "./routes";
import bodyParser from "body-parser";

import { uploadConfig } from "./config/upload";

const run = async () => {
  const app = express();
  const prisma = await getPrisma();

  app.set("trust proxy", true);
  app.disable("x-powered-by");

  app.use(cors());

  app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER));

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  app.use(express.urlencoded({ extended: false }));
  app.use(passport.initialize());
  app.use(router);
  app.use(
    (
      error: Error,
      request: Request,
      response: Response,
      next: NextFunction,
    ) => {
      console.error("38: Erro não tratado:", error);
      return response.status(500).json({
        error: error.toString(),
      });
    },
  );

  const port = 3000;
  const server = app.listen(`${process.env.PORT ?? port}`, () => {
    console.log(
      `Server ready & listening to http://localhost:${
        process.env.PORT || port
      }`,
    );
  });

  return {
    app,
    server,
  };
};

const main = run();

export default main;
