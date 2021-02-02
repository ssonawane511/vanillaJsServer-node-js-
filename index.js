/**
 * /*
 * primary file for the api and
 *
 * @format
 */

// Dependencies
const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

// the server should responde to all re with a string

const server = http.createServer((req, res) => {
  // get url and parse it into
  const parsedUrl = url.parse(req.url, true);

  //   console.log(req);

  // get the path from url
  // console.log(parsedUrl);

  const path = parsedUrl.pathname;

  // we are triming the path
  const trimedPath = path.replace(/^\/+|\/+$/g, "");

  // console.log("trimed path ", trimedPath);
  // get the query string
  const querStringObject = parsedUrl.query;

  // console.log("querst string ", querStringObject);
  // get th http req method
  const method = req.method.toLowerCase();

  // console.log("this is the method", method);
  // lets see the headers

  const headers = req.headers;

  // console.log(headers);

  // now lets take the payload from the request
  const decoder = new StringDecoder("utf-8");
  var buffer = "";
  req.on("data", (data) => {
    buffer += decoder.write(data);
  });
  req.on("end", () => {
    console.log("envent ender ");
    buffer += decoder.end();
    // then send the response

    // switch to the handlers

    const chooseHandler =
      typeof router[trimedPath] !== "undefined"
        ? router[trimedPath]
        : handlers.notfound;

    var data = {
      trimedPath: trimedPath,
      querStringObject: querStringObject,
      method: method,
      headers: headers,
      payload: buffer,
    };

    console.log(data);

    chooseHandler(data, (statusCode, payload) => {
      // use the status code calledn back by the handler , or defalut

      StatusCode = typeof statusCode == "number" ? statusCode : 200;

      payload = typeof payload == "object" ? payload : {};

      // we cant sent object so to conver the data to string
      const payloadString = JSON.stringify(payload);
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(payloadString);

      console.log("returning the response ", statusCode, payloadString);
    });

    // res.end("hello world");
    // // log the payload
    // console.log("request payload was ", buffer);
  });

  //   console.log(
  //     "requested path was " +
  //       trimedPath +
  //       " with the method " +
  //       method +
  //       " query string "
  //   );
  // log the requested log
});

// start the server and have it  listen on port
server.listen(3000, () => {
  console.log("listenig on port 3000");
});

// this is handlers object
const handlers = {};

// sample handler
handlers.sample = (data, callback) => {
  //callnback a http status code and payload
  // payload should be object

  console.log("camed from the router ", data);

  callback(406, { name: "sample handlers" });
};

handlers.notfound = (data, callback) => {
  callback(404);
};

// router will call the handler function
var router = {
  sample: handlers.sample,
};
