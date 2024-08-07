import * as pulumi from "@pulumi/pulumi";
import * as upstash from "@upstash/pulumi";
import "dotenv/config";

export const PROJECT_NAME = pulumi.getProject();
export const PROJECT_STACK = pulumi.getStack();
const REGION = "ap-southeast-1";

const provider = new upstash.Provider("upstash", {
  email: process.env.UPSTASH_EMAIL as string,
  apiKey: process.env.UPSTASH_API_KEY as string,
});

const redis = new upstash.RedisDatabase(
  `${PROJECT_NAME}-redis`,
  {
    databaseName: PROJECT_STACK,
    region: "global",
    primaryRegion: REGION,
    tls: true,
    eviction: true,
  },
  { provider },
);

export const databaseId = redis.databaseId;
export const databaseName = redis.databaseName;
export const databaseEndpoint = redis.endpoint;
