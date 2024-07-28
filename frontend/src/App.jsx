import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";

// const ENDPOINT = "http://localhost:3000/";
// const socket = socketIO(ENDPOINT, { transports: ["websocket"] });
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Join />} />
                    <Route path="/chat" element={<Chat />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
