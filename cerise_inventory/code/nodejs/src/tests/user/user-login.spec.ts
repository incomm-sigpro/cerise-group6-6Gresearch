import { PrismaClient } from "@prisma/client";
import { Express } from "express";
import { Server } from "http";
import { login } from "./../user/utils";

describe("Login flow", () => {
  let app: Express;
  let server: Server;
  let prisma: PrismaClient;

    beforeAll(async () => {
      const { getPrisma } = await import("@/db/prisma");

      prisma = await getPrisma();

      const { default: main } = await import("@/index");

      ({ app, server } = await main);
    });

    afterEach(async () => {
      await new Promise(process.nextTick);
    });

    afterAll(async () => {
      await prisma.$disconnect();
  
      server.close();
    });

    it("should return 200 OK on login", async () => {
        const logged = await login(app, 'rafaelds.89@gmail.com', '123456');

        expect(logged.status).toBe(200);
        expect(logged.body).toHaveProperty('token');
        expect(logged.body).toEqual(expect.objectContaining({
          token: expect.any(String),
          expires: expect.any(String)        
        }));
    });

    it("should invalid credentials", async () => {
      const logged = await login(app, 'other@email.com', 'any-password');

      // TODO: implementar exceptions para retornar 401
      expect(logged.status).toBe(500);
    });
});
