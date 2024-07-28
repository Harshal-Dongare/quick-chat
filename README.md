# Important use case of Modules and Libraries

**NPM modules**

1. _cors_
    > Without CORS, your server will block all request from different origins because by default, browsers enforce the same-origin policy which means browsers will except requests only from the same origin.
2. _socket.io_
    > A library that enables real-time, bidirectional communication between client and server over WebSockets.
3. _socket.io-client_
    > A library for the client side that allows a web application to communicate with a server using **socket.io**.
4. _react-scroll-to-bottom_
    > A react component that automatically scrolls to the bottom of a container when new content is added. It's useful for chat application to keep the latest messages always in view.

---

---

---

**Functions**

```javascript
const app = express();
```

Initializes an express application which we can use to define routes, middleware and handle http requests & responses. It returns an instance of express server which is an object that provides methods to configure and manage your server.

> **Note**: WebSocket module can work well with express application alone. But using HTTP server with WebSocket gives you more control and can be useful for certain advance configurations. So in such case we use http for creating server and express for handling requests & responses.

---

```javascript
const server = http.createServer(app);
```

Creates an HTTP server and connects it to the Express app. The server will use express to handle incoming requests.

---

```javascript
const io = socketIO(server);
```

It initializes **socket.io** with an **HTTP server** which allows you to use WebSockets for real time communication in your application.

---

```javascript
io.on("connection", () => {});
```

**io.on()** is used to listen for events on the server.
<br>
**io.on("connection", ...)** listens for a new user connecting to the server.

---

```javascript
const port = 3000 || process.env.PORT;
```

**process.env.PORT** is used to access the port number specified by cloud platform and hosting services where the port number is provided dynamically.

---

```javascript
const ENDPOINT = "http://localhost:3000/";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });
```

**ENDPOINT** defines where the WebSocket server is running. **socket** initializes a new WebSocket connection to the server at the specified endpoint.
**transports** refers to the different methods used to establish and maintain a connection between the client and server.
<br>
**Different methods:** **"polling"**, **"websocket"**.
<br>
If you don't specify the method object, the default method used is **"websocket"**.

---
