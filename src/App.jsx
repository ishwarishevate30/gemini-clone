import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";

import "./App.css";

const App = () => {
  console.log("App component rendered");

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar />
      <Main />
    </div>
  );
};

export default App;
