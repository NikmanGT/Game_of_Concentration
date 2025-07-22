import "./App.css";
import "./index.css";
import Homepage from "./Containers/Homepage/Homepage";
import MatchRoom from "./Containers/MatchRoom/MatchRoom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestFile from "./Containers/Test";
import Signup from "./Containers/Signup/Signup";
import Login from "./Containers/Login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/matchRoom" element={<MatchRoom />} />
          <Route path="/Test" element={<TestFile />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
