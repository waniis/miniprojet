import React from "react";
// import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import PhotoListPage from "./pages/PhotoListPage";
import PhotoPage from "./pages/PhotoPage";
import UserListPage from "./pages/UserListPage";
const App = () => {
   return (
      <BrowserRouter>
     
         <Header />
         <main className="py-3">
            <Routes>
            <Route path="/" element={ <Home />}></Route>
            <Route exact path="/users" element={<UserListPage />} />
            <Route exact path="/photos" element={<PhotoListPage />} />
            <Route exact path="/photos/:id" element={<PhotoPage />} />
            </Routes>
         </main>
         <Footer />
     
      </BrowserRouter>
   );
};

export default App;
