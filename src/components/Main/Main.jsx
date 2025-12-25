import { useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { runChat } from "../../config/gemini";
import ReactMarkdown from "react-markdown";

const Main = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await runChat(input);
      setResponse(res);
    } catch (error) {
      console.error(error);
      setResponse("Error communicating with AI.");
    }

    setLoading(false);
  };

  return (
    <div className="main">
      {/* NAV */}
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User" />
      </div>

      <div className="main-container">
        {/* Greeting */}
        {!response && (
          <div className="greet">
            <p>
              <span className="gradient">Hello, dev.</span>
            </p>
            <p className="normal">How can I help you today?</p>
          </div>
        )}

        {/* Cards */}
        {!response && (
          <div className="cards">
            <div className="card">
              <p>Suggest beautiful places to see on an upcoming road trip</p>
              <img src={assets.compass_icon} alt="" />
            </div>

            <div className="card">
              <p>Briefly summarize this concept: urban planning</p>
              <img src={assets.bulb_icon} alt="" />
            </div>

            <div className="card">
              <p>Brainstorm team bonding activities for our work retreat</p>
              <img src={assets.message_icon} alt="" />
            </div>

            <div className="card">
              <p>Improve the readability of the following code</p>
              <img src={assets.code_icon} alt="" />
            </div>
          </div>
        )}

        {/* Response */}
        {loading && <p className="loading">Thinking...</p>}

        {response && (
          <div className="result">
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        )}

        {/* Input */}
        <div className="main-border">
          <div className="search-box">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a prompt here"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img
                src={assets.send_icon}
                alt="Send"
                onClick={handleSend}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
