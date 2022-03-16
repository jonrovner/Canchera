import { Route, Routes } from "react-router";
import Clubdetail from "./components/ClubDetail/ClubDetail";
import Landing from "./components/Landing/Landing";
import OwnerSignUp from "./components/OwnerSignUp/OwnerSignUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/clubDetail" element={<Clubdetail />} />
        <Route path="/signup/owner" element={<OwnerSignUp />} />
      </Routes>
    </div>
  );
}

export default App;
