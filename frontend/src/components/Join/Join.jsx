import "./Join.css";
import AppLogo from "../../assets/app-logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Join = () => {
    const [user, setUser] = useState("");
    const navigation = useNavigate();

    const handleJoin = () => {
        if (!user) return;
        navigation("/chat", { state: { user } });
    };

    return (
        <div className="joinpage">
            <div className="join-container">
                <img src={AppLogo} alt="logo" />
                <h1>Quick Chat</h1>
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    id="joinInput"
                    placeholder="username"
                />

                <button onClick={handleJoin} className="join-btn">
                    Join The Room
                </button>
            </div>
        </div>
    );
};

export default Join;
