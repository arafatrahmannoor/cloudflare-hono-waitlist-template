import { it, expect, mock, beforeEach } from  'bun:test'
import { insertSubscriber } from './queries'
import type { D1Database } from '@cloudflare/workers-types'
import type { NewSubscriber } from './schema'


it ("insert anew subscriber into the database", async() => {
    const newSub: NewSubscriber = { email: "test@test.com" };
    const subscriber = await insertSubscriber({} as D1Database, newSub)
    console.log(subscriber)
})