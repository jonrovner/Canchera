import { Route, Routes } from "react-router";
import Landing from "./components/Landing/Landing";
import OwnerSignUp from "./components/OwnerSignUp/OwnerSignUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<OwnerSignUp />} />
      </Routes>
    </div>
  );
}

export default App;
