import React from "react";
import { Login, Test1, Test2 } from "@/presentation/pages";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Spinner: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path='/' Component={Test1} />
      </Routes>
    </BrowserRouter>
  );
};

export default Spinner;
