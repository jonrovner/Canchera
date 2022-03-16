import { Route, Routes } from "react-router";
import Landing from "./components/Landing/Landing";
import OwnerSignUp from "./components/OwnerSignUp/OwnerSignUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
<<<<<<< HEAD
        <Route path="/signup" element={<OwnerSignUp />} />
=======
        <Route path="/signup/owner" element={<OwnerSignUp />} />
>>>>>>> 3f6242ac0760370d90f4e0371124b73f2bc8f134
      </Routes>
    </div>
  );
}

export default App;
