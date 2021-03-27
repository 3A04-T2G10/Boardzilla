const express = require("express");
const app = express();
const path = require("path");
const publicPath = path.join(__dirname, "./boardzilla/public/"); //serve the client side code
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use(express.static(publicPath));
