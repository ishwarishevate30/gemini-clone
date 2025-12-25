import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const onSent = async (prompt) => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.reply);
    } catch (error) {
      console.error(error);
      setResponse("Error communicating with AI.");
    }

    setLoading(false);
  };

  const value = {
    input,
    setInput,
    response,
    loading,
    onSent,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
