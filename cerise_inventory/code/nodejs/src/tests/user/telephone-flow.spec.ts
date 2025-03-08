import { PrismaClient, TelephoneType } from "@prisma/client";
import { Express } from "express";
import { Server } from "http";
import { createPhone, createUser, login } from "./../user/utils";
import { create } from "domain";

describe("Telephone flow", () => {
  let app: Express;
  let server: Server;
  let prisma: PrismaClient;
  let user: any;

    beforeAll(async () => {
      const { getPrisma } = await import("@/db/prisma");

      prisma = await getPrisma();

      const { default: main } = await import("@/index");

      ({ app, server } = await main);

      const newUser = await createUser(app, {
        name: 'telephone-flow-name',
        email: 'telephone-flow-name@email.com',
        password: '123456',
        isActive: true,
        birthday: new Date('1989-10-10')
      });

      user = newUser.body;

      const logged = await login(app, 'telephone-flow-name@email.com', '123456');
      user.token = logged.body.token;
    });

    afterEach(async () => {
      await new Promise(process.nextTick);
    });

    afterAll(async () => {
      await prisma.$disconnect();
  
      server.close();
    });

    it("should create telephone from a user", async () => {
      const response = await createPhone(app, TelephoneType.MOBILE, '999999999', user.id, user.token);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });

    it("should not create telephone from a user with invalid type", async () => {
      const response = await createPhone(app, 'invalid-type', '999999999', user.id, user.token);

      expect(response.status).toBe(500);
    });
});
