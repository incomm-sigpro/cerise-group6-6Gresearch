import { PrismaClient } from "@prisma/client";
import { Lookup } from "geoip-lite";
import { ISessionRepository } from "./interfaces/ISessionRepository";

export default class SessionRepository implements ISessionRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  add(
    userId: string,
    ip: string,
    userAgent?: string,
    language?: string,
    geodata?: Lookup | null,
  ) {
    if (geodata) {
      const {
        country,
        region,
        ll: [latitude, longitude],
      } = geodata;

      return this.prisma.session.create({
        data: {
          user: {
            connect: { id: userId },
          },
          ip,
          userAgent,
          country,
          region,
          language,
          latitude,
          longitude,
        },
      });
    }

    return this.prisma.session.create({
      data: {
        user: {
          connect: { id: userId },
        },
        ip,
        userAgent,
        language,
      },
    });
  }
}
