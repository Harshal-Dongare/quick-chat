const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Object to store user information by socket id
const users = {};

// Middleware
app.use(cors());

// Routes
app.get("/", (req, res) => {
    res.send("Chat Application");
});

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIO(server);

// Socket.IO connection
io.on("connect", (socket) => {
    console.log("New client connected");

    // When a new user joins
    socket.on("joined", ({ user }) => {
        users[socket.id] = user; // Store user info by socket id

        console.log(`${user} has joined`);

        // Notify other users
        socket.broadcast.emit("userJoined", {
            user: "Admin",
            message: `${users[socket.id]} has joined`,
        });

        // Send welcome message to the new user
        socket.emit("welcome", {
            user: "Admin",
            message: `Welcome to the chat, ${users[socket.id]}!`,
        });

        // Handle incoming messages
        socket.on("message", ({ userText, userId }) => {
            io.emit("showMessageToAll", {
                user: users[userId] || "Unknown", // Fixed mapping of user
                userText,
                userId,
            });
        });

        // Handle user disconnection
        socket.on("disconnect", () => {
            socket.broadcast.emit("leave", {
                user: "Admin",
                message: `${users[socket.id]} has left`,
            });
            console.log("User left the chat!");
            delete users[socket.id]; // Clean up user info
        });
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
