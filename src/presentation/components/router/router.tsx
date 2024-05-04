import React from "react";
import { Login } from "@/presentation/pages";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Spinner: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={Login} />
        {/* <Route path='/' Component={Login} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Spinner;
