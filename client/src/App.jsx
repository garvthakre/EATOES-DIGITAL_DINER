import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

 
import Menu from './pages/MenuPage';
import OrderLookup from './pages/OrderLookup';
import OrderDetails from './pages/OrderDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';
 
 

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/order-lookup" element={<OrderLookup />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
             
            
          </Routes>
        </main>
         
      </div>
    </Router>
  );
}

export default App;