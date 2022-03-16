import { Route, Routes } from "react-router";
import Landing from "./components/Landing/Landing";
import OwnerSignUp from "./components/OwnerSignUp/OwnerSignUp";
import UserSignUp from "./components/UserSignUp/UserSignUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup/owner" element={<OwnerSignUp />} />
        <Route path="/signup/user" element={<UserSignUp />} />
      </Routes>
    </div>
  );
}

export default App;
