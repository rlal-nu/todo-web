import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./app/Login";
import "antd/dist/antd.css";
import "./index.css";
import { Regsiter } from "./app/Regsiter";
import { Task } from "./app/Task";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Login />} />
          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Regsiter />} />
          <Route path="task" element={<Task />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
