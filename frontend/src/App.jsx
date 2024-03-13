import { BrowserRouter, Route, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Loading from "./components/Loading";
import Page404 from "./pages/404";
import DataContext from "./variabels/Context.js"
import Middleware from "./components/Midleware.jsx"
import UserFunction from "./functions/UserFuntion.js";
import Utama from "./pages/Utama.jsx";
import BukuFunction from "./functions/BukuFunction.js";
import ShowBuku from "./pages/buku/showBuku.jsx";
import BagianFunction from "./functions/BagianFunction.js";

export default function App () {
  const [user,setUser] = useState();
  const [buku,setBuku] = useState([]);
  const userFunction = new UserFunction(user,setUser);
  const bukuFunction = new BukuFunction(buku,setBuku,userFunction.checkStatus);
  const bagianFunction = new BagianFunction(userFunction.checkStatus);

  const globalVariabel = {
    user,
    setUser,
    userFunction,
    bukuFunction,
    bagianFunction,
    checkStatus:userFunction.checkStatus,
  }

  useEffect(() => {
    userFunction.get();
  },[])

  return <BrowserRouter>
    <DataContext.Provider value={globalVariabel} >

      <Middleware next={user == undefined} >
        <Route path="*" element={<Loading />} />
      </Middleware>

      <Middleware next={user == false} >
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register />} />  
        <Route path="*" element={<Login />} />
      </Middleware>

      <Middleware next={user} >
        <Route path="/" element={<Utama />} />
        <Route path="*" element={<Page404 />} />

        <Route path="/buku/:id" element={<ShowBuku />} />
      </Middleware>
      
    </DataContext.Provider>
  </BrowserRouter>
}