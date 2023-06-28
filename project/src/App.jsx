import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/app.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

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
        <Route path="/cart">
          <Route index element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route path="/rookie" element={<Rookie />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
