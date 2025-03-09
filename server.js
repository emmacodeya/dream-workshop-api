const jsonServer = require("json-server");
const cors = require("cors");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); 
const middlewares = jsonServer.defaults({ static: "./public" }); 

server.use(cors());
server.use("/assets", jsonServer.defaults({ static: path.join(__dirname, "public") }));
server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
