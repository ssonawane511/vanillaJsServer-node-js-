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
  console.log(parsedUrl);

  const path = parsedUrl.pathname;

  // we are triming the path
  const trimedPath = path.replace(/^\/+|\/+$/g, "");

  // get the query string
  const querStringObject = parsedUrl.query;

  console.log(querStringObject);
  // get th http req method
  const method = req.method.toLowerCase();

  // lets see the headers

  const headers = req.headers;

  console.log(headers);

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

    res.end("hello world");
    // log the payload
    console.log("request payload was ", buffer);
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
