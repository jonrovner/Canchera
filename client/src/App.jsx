import { Route, Routes } from "react-router";
import Clubdetail from "./components/ClubDetail/ClubDetail";
import CreateClub from "./components/createClub/CreateClub";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import OwnerSignUp from "./components/OwnerSignUp/OwnerSignUp";
import UserSignUp from "./components/UserSignUp/UserSignUp";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/clubDetail" element={<> <NavBar/> <Clubdetail /> </>} />
        <Route path="/signup/owner" element={<OwnerSignUp />} />
        <Route path="/signup/user" element={<UserSignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createClub" element={<> <NavBar/> <CreateClub /> </>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
