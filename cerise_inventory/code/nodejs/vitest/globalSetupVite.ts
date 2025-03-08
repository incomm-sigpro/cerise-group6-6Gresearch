import "dotenv/config";

import util from "util";
import { exec } from "child_process";
// import * as nock from "nock";
// import { createClient } from "redis";

const asyncExec = util.promisify(exec);
const DATABASE_URL = process.env.DATABASE_URL_TEST;
// const REDIS_URL = process.env.REDIS_URL_TEST;

export default async function globalSetup() {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  require("events").EventEmitter.defaultMaxListeners = 0;

  process.setMaxListeners(0);

  process.env.DATABASE_URL = DATABASE_URL;
  // process.env.REDIS_URL = REDIS_URL;
  process.env.PORT = "4001";

  await asyncExec("yarn prisma migrate reset --force");
  await asyncExec("yarn seed");

  // eslint-disable-next-line no-console
  console.log(`Running on database ${DATABASE_URL}`);
  // const client = createClient({
  //   url: REDIS_URL,
  // });
  // await client.connect();

  // await client.flushAll();
  // await client.flushDb();

  // await client.disconnect();

  // eslint-disable-next-line no-console
  console.log("\nTest database created successfully");

  return async function globalTearDown() {
    process.env.DATABASE_URL = DATABASE_URL;
    // await asyncExec("yarn prisma db push --force-reset");

    // const redisClient = createClient({
    //   url: process.env.REDIS_URL,
    // });
    // await redisClient.connect();

    // await redisClient.flushAll();
    // await redisClient.flushDb();

    // await redisClient.disconnect();
  };
}
