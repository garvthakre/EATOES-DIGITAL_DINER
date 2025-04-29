import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MenuPage from "./pages/MenuPage";
 
import PrivateRoute from "./components/PrivateRoute";
 

function App() {
  return (
    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1 className="text-red-600">Page Not Found</h1>} />
      </Routes>
       
    </BrowserRouter>
  );
}

export default App;