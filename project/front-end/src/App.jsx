import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Homepage from "./pages/Homepage";
import StockIndex from "./pages/StockIndex";
import IndStock from "./pages/IndStock";
import Forum from "./pages/Forum";
import Shop from "./pages/Shop";
import History from "./pages/History";
import Checkout from "./pages/Checkout";
import Rookie from "./pages/Rookie";
import Register from "./pages/Register";
import Member from "./pages/Member";
import MemberEdit from "./pages/MemberEdit";
import MemberMail from "./pages/memberMail";
import MemberArtical from "./pages/MemberArtical";
import MemberCol from "./pages/Membercol";
import { ShopContextProvider } from "../context/ShopContext";
import Chats from "./pages/Chats";
import News from "./pages/News";
import Targets from "./pages/Targets";
import Questions from "./pages/Questions";
import Notes from "./pages/Notes";

function App() {
  return (
    <ShopContextProvider>
      <Router>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/stock-index" element={<StockIndex />} />
          <Route path="/indStock" element={<IndStock />} />
          <Route path="/forum">
          <Route index element={<Forum></Forum>} />
          <Route path="/forum/chats" element={<Chats />} />
          <Route path="/forum/news" element={<News />} />
          <Route path="/forum/targets" element={<Targets />} />
          <Route path="/forum/questions" element={<Questions />} />
          <Route path="/forum/notes" element={<Notes />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/member" element={<Member />} />
          <Route path="/member/edit" element={<MemberEdit />} />
          <Route path="/member/mail" element={<MemberMail />} />
          <Route path="/member/col" element={<MemberCol />} />
          <Route path="/member/artical" element={<MemberArtical />} />
          <Route path="/shop">
            <Route index element={<Shop></Shop>} />
            <Route path="/shop/history" element={<History />} />
          </Route>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/rookie" element={<Rookie />} />
        </Routes>
      </Router>
    </ShopContextProvider>
  );
}

export default App;
