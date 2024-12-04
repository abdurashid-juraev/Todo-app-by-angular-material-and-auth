const jsonServer = require("json-server");
const auth = require("json-server-auth");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const rules = auth.rewriter({
  users: 600, // faqat adminlar kirishi mumkin
  "/auth/login": 640, // autentifikatsiyadan o'tgan foydalanuvchilar kirishi mumkin
});

server.db = router.db;

server.use(middlewares);
server.use(rules);
server.use(auth);
server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000");
});
