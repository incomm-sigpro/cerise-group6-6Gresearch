import { Session } from "@prisma/client";
import { Lookup } from "geoip-lite";

export interface ISessionRepository {
  add(
    userId: string,
    ip: string,
    userAgent?: string,
    language?: string,
    geodata?: Lookup | null,
  ): Promise<Session>;
}
