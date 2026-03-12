import { useState,createContext } from "react";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart"; 
import Orders from "./components/Orders";
import Logout from "./components/Logout";
import { BrowserRouter,Route,Routes } from "react-router-dom";

export const AppContext = createContext()
function App() {
  const [user,setUser]=useState({})

  return (
    <div>
      <AppContext.Provider value={{user,setUser}}>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route index element ={<Content/>} />
        <Route path="cart" element={<Cart/>} />
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="orders" element={<Orders/>} />
        <Route path="logout" element={<Logout/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>
      </AppContext.Provider>
    </div>
    
  );

}


export default App;
