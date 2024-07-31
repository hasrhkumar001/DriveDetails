import "../src/dist/styles.css";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Navbar from "../src/components/Navbar";
import { Route, Routes } from "react-router-dom";
import Models from "./Pages/Models";
import Contact from "./Pages/Contact";
import Footer from "./components/Footer";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import CarDetail from "./Pages/CarDetail";
import SearchResults from "./Pages/SearchResults";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="cars" element={<Models />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="cars/:id" element={<CarDetail />} />
        <Route path="/search-results" element={<SearchResults />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
