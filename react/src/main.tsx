import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserPage from "./components/UserPage/UserPage.tsx";
import DataList from "./components/DataList/DataList.tsx";
import UserForm from "./components/UserForm/UserForm.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DataList />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/new" element={<UserForm />} />
        <Route path="/edit/:id" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
