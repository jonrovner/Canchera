import { useEffect } from "react";
import { Route, Routes } from "react-router";
import Clubdetail from "./components/ClubDetail/ClubDetail";
import CreateClub from "./components/createClub/CreateClub";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import ContactUs from "./components/Email/Email"
import NotFound from "./components/NotFound/NotFound";
import OwnerSignUp from "./components/OwnerSignUp/OwnerSignUp";
import UserSignUp from "./components/UserSignUp/UserSignUp";
import { useDispatch } from "react-redux";
import { get_users_email } from "./redux/action";
import ListClubs from "./components/ListClubs/ListClubs";
<<<<<<< HEAD
import Dashboar from "./components/Dashboar/Dashboar";


=======
>>>>>>> 40a0a2786feea329f93812b2c419625385d41100
function App() {
  const dispatch = useDispatch();

  let fn = async (usuario) => {
    await dispatch(get_users_email(usuario));
  };
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      fn(foundUser);
    }
  });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
<<<<<<< HEAD
        <Route path="/dashboar" element={<Dashboar/>} />
=======
>>>>>>> 40a0a2786feea329f93812b2c419625385d41100
        <Route path="/signup/owner" element={<OwnerSignUp />} />
        <Route path="/signup/user" element={<UserSignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/createClub" element={<CreateClub />} />
        <Route path="/clubs" element={<ListClubs />} />
        <Route path="/club/:clubName" element={<Clubdetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
