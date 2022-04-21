import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddUser from "./components/addUser/AddUser";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import UpdateUser from "./components/updateUser/updateUser";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/user/add" element={<AddUser />}></Route>
        <Route path="/user/update/:id" element={<UpdateUser />}></Route>
      </Routes>
    </div>
  );
}

export default App;
