const express = require("express");
const app = express();
const port = 3009;
const route = require("./routes");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

route(app);

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
