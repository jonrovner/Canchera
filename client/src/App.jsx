import { Route, Routes } from "react-router";
import Clubdetail from "./components/ClubDetail/ClubDetail";
import Landing from "./components/Landing/Landing";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/clubDetail" element={<Clubdetail />} />
      </Routes>
    </div>
  );
}

export default App;
