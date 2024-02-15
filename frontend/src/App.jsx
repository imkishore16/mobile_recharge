/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Plans from "./components/Plans";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Addons from "./components/Addons";
import Invoice from "./components/Invoice";
import Pay from "./components/Pay";
import DataPlan from "./components/DataPlan";
import Recharge from "./components/Recharges";
import Dashboard from "./components/Dashboard";
import AddPlans from "./components/AddPlans";
import Popup from "./components/Popup";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import EditPlan from "./components/EditPlan";

function App() {
  return (
    <>
      <BrowserRouter>
        {sessionStorage.getItem("isLoggedIn") != null && (
          <div>
            <Navbar />
          </div>
        )}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/addons" element={<Addons />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/recharges" element={<Recharge />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addplans" element={<AddPlans />} />
          <Route path="/popup" element={<Popup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/editPlan" element={<EditPlan />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
