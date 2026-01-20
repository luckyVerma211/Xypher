import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './components/Home';
import CreateWallet from "./components/CreateWallet";
import SetPassword from "./components/SetPassword";
import Login from "./components/Login";
import ViewSeed from "./components/ViewSeed";
import SetUserName from "./components/SetUserName";
import Wallet from "./components/Wallet";
import SendSol from "./components/SendSol";
import SendEth from "./components/SendEth";


function App() {
  const alreadyUser  = JSON.parse(localStorage.getItem("cryptex"));
  const seedSaved = JSON.parse(localStorage.getItem('seedSaved'));

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={alreadyUser?<Login/> : <CreateWallet />} />
          {/* <Route path="/create" element={ <CreateWallet />} /> */}
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="/login" element={alreadyUser?<Login/>:<CreateWallet />} />
          <Route path="/seed-phrase" element={seedSaved ?< Login/>:<ViewSeed />} />
          <Route path="/set-user-name" element={<SetUserName />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/sendSol" element={<SendSol />} />
          <Route path="/sendEth" element={<SendEth />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
