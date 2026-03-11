import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart"; 
import Orders from "./components/Orders";
import { BrowserRouter,Route,Routes } from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route index element ={<Content/>} />
        <Route path="cart" element={<Cart/>} />
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="orders" element={<Orders/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
    
  );

}


export default App;
