import { useEffect } from "react";
import { Route, Routes } from "react-router";
import Clubdetail from "./components/ClubDetail/ClubDetail";
import CreateClub from "./components/createClub/CreateClub";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import OwnerSignUp from "./components/OwnerSignUp/OwnerSignUp";
import UserSignUp from "./components/UserSignUp/UserSignUp";
import { useDispatch } from "react-redux";
import { get_users_email } from "./redux/action";
import Navbar from "./components/NavBar/NavBar";
import ListClubs from "./components/ListClubs/ListClubs";

function App() {
  const dispatch = useDispatch();

  let fn = async (usuario) => {
    await dispatch(get_users_email(usuario.email));
  };
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      fn(foundUser);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/clubDetail"
          element={
            <>
              {" "}
              <Navbar /> <Clubdetail />{" "}
            </>
          }
        />
        <Route path="/signup/owner" element={<OwnerSignUp />} />
        <Route path="/signup/user" element={<UserSignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/createClub"
          element={
            <>
              {" "}
              <Navbar /> <CreateClub />{" "}
            </>
          }
        />
        <Route path="/clubs" element={<ListClubs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
