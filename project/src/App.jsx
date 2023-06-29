import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import StockIndex from "./pages/StockIndex";
import IndStock from "./pages/IndStock";
import Forum from "./pages/Forum";
import Member from "./pages/Member";
import Shop from "./pages/Shop";
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
        <Route path="/memeber" element={<Member />} />
        <Route path="/shop">
          <Route index element={<Shop />} />
          <Route path="/shop/checkout" element={<Checkout />} />
        </Route>
        <Route path="/rookie" element={<Rookie />} />
      </Routes>
      {/* <Footer></Footer> */}
    </Router>
  );
}

export default App;
