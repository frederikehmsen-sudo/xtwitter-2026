import { serve } from "bun";
import index from "./index.html";
import type {MyRegisterForm} from "@/APITester.tsx";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async POST(req) {
        const requestBody = (await req.json()) as MyRegisterForm
        if(!requestBody.email.includes('@')) {
          return Response.json({
            message: 'Not a valid email'
          })
        }
        if(requestBody.password.length < 6) {
          return Response.json({
            message: "Password should be more than 6 characters"
          })
        }
        return Response.json({
          message: "Logging in",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
