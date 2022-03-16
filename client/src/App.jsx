import { Route, Routes } from "react-router";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import OwnerSignUp from "./components/OwnerSignUp/OwnerSignUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup/owner" element={<OwnerSignUp />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
