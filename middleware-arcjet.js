import arcjet, { createMiddleware, detectBot, shield } from '@arcjet/next';
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules:[
    shield({
      mode:"LIVE"
    }),
    detectBot({
      mode:"LIVE",
      allow:["CATEGORY:SEARCH_ENGINE", "GO_HTTP"]
    })
  ]
})


export default createMiddleware(aj);


export const config = {
  matcher: ["/api/:path*"], // run only on API routes
};