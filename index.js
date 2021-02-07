/**
 * /*
 * primary file for the api and
 *
 * @format
 */

// Dependencies
const http = require("http"); // here we will get the function to createServer
const url = require("url"); // here  we will fetchdetials from the url object comming
const StringDecoder = require("string_decoder").StringDecoder; // this will be used when we need to read the payload
const config = require("./config"); // here we are defining the evnvirnonment we need to start the server
// the server should responde to all re with a string

const server = http.createServer((req, res) => {
  // this function is creating the raw http server using the creatServer function
  // get url and parse it into
  const parsedUrl = url.parse(req.url, true); // here we are using the url lib to take comming req url info

  // but to take details from the url object we need to parse it
  /* 
  this will be included in the url object 
  {
    pathname,
    query,
    method,
    headers if any ,
  }
 */
  //   console.log(req);

  // get the path from url
  // console.log(parsedUrl);

  const path = parsedUrl.pathname;

  // we are triming the path
  const trimedPath = path.replace(/^\/+|\/+$/g, "");

  //replace function taking the regex pattern to trin slashes
  // console.log("trimed path ", trimedPath);
  // get the query string

  const querStringObject = parsedUrl.query; // here we are geting the query values if any
  // console.log("querst string ", querStringObject);
  // get th http req method
  const method = req.method.toLowerCase();
  //REQ.METHOD will give the information about method

  // console.log("this is the method", method);
  // lets see the headers

  const headers = req.headers;

  // console.log(headers);

  // now lets take the payload from the request
  const decoder = new StringDecoder("utf-8");

  // here we [have initailize the decoder from the lib (string_decoder).StringDecoder]
  var buffer = "";
  req.on("data", (data) => {
    buffer += decoder.write(data);
  });

  // this it the event io payload will be in the buffer chunks to we need to save and decode it
  req.on("end", () => {
    // on end all runs on every req
    console.log("envent ender ");
    buffer += decoder.end();
    // then send the response

    // switch to the handlers

    // choosing the handler
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
server.listen(config.port, () => {
  console.log("listenig on port ", config.port);
  console.log("starting the server the at ", config.evnName);
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
