import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Homepage from "./pages/Homepage";
import StockIndex from "./pages/StockIndex";
import IndStock from "./pages/IndStock";
import Forum from "./pages/Forum";
import Member from "./pages/Member";
import MemberMail from "./pages/memberMail";
import MemberArtical from "./pages/MemberArtical";
import Register from "./pages/register";
import Shop from "./pages/Shop";
import History from "./pages/History";
import Checkout from "./pages/Checkout";
import Rookie from "./pages/Rookie";

function App() {
  return (
    <Router>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/stock-index" element={<StockIndex />} />
        <Route path="/indStock" element={<IndStock />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/member" element={<Member />} />
        <Route path="/member/mail" element={<MemberMail />} />
        <Route path="/member/artical" element={<MemberArtical />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop">
          <Route index element={<Shop></Shop>} />
          <Route path="/shop/history" element={<History />} />
        </Route>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/rookie" element={<Rookie />} />
      </Routes>
    </Router>
  );
}

export default App;
