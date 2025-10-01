// import { PrismaClient } from "@prisma/client";

import { PrismaClient } from "./generated/prisma/edge";

export const db = globalThis.primsa || new PrismaClient();

if(process.env.NODE_ENV !== "production") {
    globalThis.primsa = db;
}

/* 
    globalThis.prisma: this global variable ensures that the prisma client instance is
    reused across hot reloads during developement. Without this, each time your
    application reloads, a new instance of the prisma client would be created, potentially
     leading to connection issues. 
*/