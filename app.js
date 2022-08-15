const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const moment = require("moment");
var fs = require("fs");
var createError = require("http-errors");
require("dotenv").config();

const db = require("./src/db");
const routerMap = require("./router");
let app = express();

const DB_URL = 'mongodb+srv://snmk1509:snm101510@kreatorverse.iiaxb4x.mongodb.net/kreatorverse?retryWrites=true&w=majority'

// //create API log folder outside the project directory to avoid the project restart
// const folder = "../api-logs";

initialSetup = () => {
  app.use(bodyparser.json({ limit: "150mb", parameterLimit: 5000 }));
  app.use(bodyparser.urlencoded({limit:'150mb', parameterLimit:5000, extended:true }))

  app.use(express.json())
  app.use(express.urlencoded({extended:false}))
  app.use(cors({ origin: "*" }));

  // // setup the logger
  // if (!fs.existsSync(folder)) {
  //   fs.mkdirSync(folder);
  //   fs.writeFileSync(`${folder}/log.json`, JSON.stringify([]));
  // }

  // app.use(
  //   morgan((tokens, req, res) => {
  //     let rawdata = fs.readFileSync(`${folder}/log.json`);
  //     let jsonData = JSON.parse(rawdata);
  //     const data = {
  //       "METHOD:": tokens.method(req, res),
  //       "URI:": tokens.url(req, res),
  //       "STATUS_CODE:": tokens.status(req, res),
  //       "BODY:": JSON.stringify(req.body),
  //       PARAMS: JSON.stringify(req.params),
  //       QUERY_PARAMS: JSON.stringify(req.query),
  //       "HEADER:": JSON.stringify(req.headers),
  //       API_RES: req.apiRes ? JSON.stringify(req.apiRes) : null,
  //       "RESPONCE_TIME:": `${tokens["response-time"](req, res)}ms`,
  //       "TOTAL_RES_TIME:": `${tokens["total-time"](req, res)}ms`,
  //       "REQ_DATE_TIME:": moment(tokens.date()).format("DD-MM-YYYY hh:mm:ss A"),
  //     };
  //     jsonData.push(data);
  //     fs.writeFileSync(`${folder}/log.json`, JSON.stringify(jsonData, null, 2));
  //     return;
  //   })
  // );
};

//  route setup
routesSetups = () => {
  for (const iterator of routerMap) {
    console.log(`Initializing ${iterator.fileName} --> /api${iterator.path}`);
    const router = require(iterator.fileName);
    if (iterator.middleware && iterator.middleware.length > 0) {
      app.use(`/api${iterator.path}`, ...[...iterator.middleware, router]);
    } else {
      app.use(`/api${iterator.path}`, router);
    }
    console.log(`👍`);
  }
};

errorHandlers = () => {
  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    res.send("Internal Server Error!");
  });
  console.log("error handlers setup done 👍");
};

dbConnection = () => {
  db.connect(DB_URL);
}

initialSetup();
routesSetups();
errorHandlers();
dbConnection();
const listerner = app.listen(process.env.PORT || 8000, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${
      listerner.address().port
    }`
  );
});
