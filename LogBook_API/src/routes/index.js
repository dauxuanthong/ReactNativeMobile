const rentalZLogBookRoute = require("./rentalZLogBook.js");

const route = (app) => {
  app.use("/rentalZLogBook", rentalZLogBookRoute);
};

module.exports = route;
