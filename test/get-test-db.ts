import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";



export const gettestDb = () => {
    const sqlite = new Database("test.sqlite");
    return drizzle(sqlite);
};