import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import MainPage from "./pages/MainPage/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StoreProvider from "./contexts/StoreProvider";
import MyBooks from "./pages/MyBooks/MyBooks";
import SignIn from "./pages/Registration/SignIn";
import Login from "./pages/Registration/Login";
import { AuthProvider } from "./contexts/AuthProvider";
// import TestProvider from "./contexts/TestProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <StoreProvider>
          <div className="container">
            <Navbar />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/myBooks" element={<MyBooks />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </StoreProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
