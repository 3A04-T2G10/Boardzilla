const express = require("express");
const path = require("path");
require("./config/environment");
require("./database");

const routes = require("./routes/index");
const configPassport = require("./config/passport");

const assetFolder = path.resolve(__dirname, "../dist/");
const port = 3013;
const app = express();

app.use(express.static(assetFolder));
app.use(express.json());

configPassport(app, express);

app.use("/", routes);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
