import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";

const { PORT, NODE_ENV, API_HOST, LABOITE_HOST, APPS_HOST, UML_SERVER } =
  process.env;
const dev = NODE_ENV === "development";

polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware({
      session: (req) => ({
        env: { API_HOST, LABOITE_HOST, APPS_HOST, UML_SERVER },
      }),
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
