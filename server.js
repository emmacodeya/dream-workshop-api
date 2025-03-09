const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use("/assets", jsonServer.static(path.join(__dirname, "public")));
server.use((req, res, next) => {
  if (["POST", "PUT", "DELETE", "PATCH"].includes(req.method)) {
    setTimeout(() => {
      fs.writeFileSync(path.join(__dirname, "db.json"), JSON.stringify(router.db.getState(), null, 2));
    }, 500); 
  }
  next();
});


server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
