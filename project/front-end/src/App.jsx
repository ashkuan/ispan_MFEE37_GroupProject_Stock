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
import Myproduct from "./pages/Myproduct";
import { ShopContextProvider } from "../context/ShopContext";
import Chats from "../src/components/Forum/Chats";
import News from "../src/components/Forum/News";
import Targets from "../src/components/Forum/Targets";
import Questions from "../src/components/Forum/Questions";
import Notes from "../src/components/Forum/Notes";
import { StockContextProvider } from "../context/StockContext";

function App() {
  return (
    <ShopContextProvider>
      <StockContextProvider>
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
              <Route path="/shop/myproduct" element={<Myproduct />} />
              <Route path="/shop/history" element={<History />} />
              <Route path="/shop/checkout" element={<Checkout />} />
            </Route>
            <Route path="/rookie" element={<Rookie />} />
          </Routes>
        </Router>
      </StockContextProvider>
    </ShopContextProvider>
  );
}

export default App;
