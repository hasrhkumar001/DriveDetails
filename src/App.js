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
import { ForgetPassword } from "./Pages/ForgetPassword";
import { ResetPassword } from "./Pages/ResetPassword";
import ProfileDetails from "./Pages/ProfileDetails";
import { AuthProvider } from "./components/AuthContext";
import Review from "./components/Review";



function App() {
  return (
    <>
     <AuthProvider>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="cars" element={<Models />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="cars/:id" element={<CarDetail />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/profile" element={<ProfileDetails />} />
        <Route path="/profile/review" element={<Review />} />
      </Routes>
      <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
