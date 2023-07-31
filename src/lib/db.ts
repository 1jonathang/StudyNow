// initializing our database

import { PrismaClient } from "@prisma/client";
// want this to only run on the server
import "server-only";

declare global {
    // eslint-disable-next-line no-var, no-unused-vars
    // in dev, everytime we hot-reload, its going to initialize new prismaclient which wasted resources
    var cachedPrisma: PrismaClient;
}

// export our prisma client to be used throughout our application
export let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    // if we are in production, initalize new prismaclient that we reuse everytime and not waste resources
    prisma = new PrismaClient();
} else {
    // when in development, we use our same prisma client and not make a new one, if not then we make a new one
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient();
    }
    prisma = global.cachedPrisma;
}