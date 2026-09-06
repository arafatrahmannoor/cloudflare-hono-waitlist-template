import { createMiddleware } from "hono/factory";
import { createRemoteJWKSet, jwtVerify } from "jose";

export const accessAuth = createMiddleware(async (c, next) => {
  // const ACCESS_AUD =
  //   "1dc88100dc5f540fee23727b1555ab8c3607c3c21d51ea93db1a592f1c95e9df";
  // const ACCESS_JWKS = createRemoteJWKSet(
  //   new URL(
  //     "https://green-fire-15ed.cloudflareaccess.com/cdn-cgi/access/certs",
  //   ),
  // );

  if (!c.env.POLICY_ID) {
    return c.json("Missing Access identity", 403);
  }
  const token = c.req.header("CF-Access-Jwt-Assertion");

  if (!token) {
    return c.json("Missing Access identity!!", 403);
  }

  const ACCESS_JWKS = createRemoteJWKSet(
    new URL(`${c.env.CF_ACCESS_DOMAIN}/cdn-cgi/access/certs`),
  );

  await jwtVerify(token, ACCESS_JWKS, {
    issuer: c.env.CF_ACCESS_DOMAIN,
    audience: c.env.POLICY_ID,
  });
  await next();
});
