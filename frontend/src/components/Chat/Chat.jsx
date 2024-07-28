import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import socketIO from "socket.io-client";
import { IoIosSend } from "react-icons/io";
import "./Chat.css";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { AiOutlineCloseCircle } from "react-icons/ai";

import Message from "../Message/Message";

const ENDPOINT = "http://localhost:3000/";

let socket;
const Chat = () => {
    const location = useLocation();
    const { user } = location.state || {};

    const [userText, setUserText] = useState("");
    const [userId, setUserId] = useState("");
    const [allMessages, setAllMessages] = useState([]);

    const sendMessage = () => {
        socket.emit("message", { userText, userId });
        setUserText("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevents the default behavior of form submission
            sendMessage();
        }
    };

    useEffect(() => {
        socket = socketIO(ENDPOINT, { transports: ["websocket"] });
        socket.on("connect", () => {
            setUserId(socket.id);
        });

        socket.emit("joined", { user });

        socket.on("welcome", ({ user, message }) => {
            setAllMessages((prevMessages) => [
                ...prevMessages,
                { user: "Admin", userText: message },
            ]);
        });

        socket.on("userJoined", ({ user, message }) => {
            setAllMessages((prevMessages) => [
                ...prevMessages,
                { user: "Admin", userText: message },
            ]);
        });

        socket.on("leave", ({ user, message }) => {
            setAllMessages((prevMessages) => [
                ...prevMessages,
                { user: "Admin", userText: message },
            ]);
        });

        socket.on("showMessageToAll", ({ user, userText, userId }) => {
            setAllMessages((prevMessages) => [
                ...prevMessages,
                { user: userId === socket.id ? "You" : user, userText, userId },
            ]);
        });

        return () => {
            socket.disconnect();
            socket.off();
        };
    }, [user]);

    return (
        <div className="chat-page">
            <div className="chat-container">
                <div className="chat-header">
                    <h2>{user.toUpperCase()}</h2>
                    <Link to="/">
                        <AiOutlineCloseCircle className="close-icon" />
                    </Link>
                </div>
                <ReactScrollToBottom className="chat-box">
                    {allMessages.map((message, i) => (
                        <Message
                            key={i}
                            userText={message.userText}
                            user={message.user}
                            classs={
                                message.userId === userId ? "right" : "left"
                            }
                        />
                    ))}
                </ReactScrollToBottom>
                <div className="chat-input">
                    <input
                        onKeyDown={handleKeyDown}
                        type="text"
                        value={userText}
                        onChange={(e) => setUserText(e.target.value)}
                        id="message"
                    />
                    <button onClick={sendMessage} className="send-btn">
                        <IoIosSend className="send-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
