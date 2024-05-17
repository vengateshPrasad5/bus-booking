import "./App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchBus from "./components/SearchBus";
import { useState } from "react";
import { locations } from "./utils";

function App() {
  const [search, setSearch] = useState({
    from: locations[0],
    to: locations[1],
    date: "",
  });
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<SearchBus search={search} setSearch={setSearch} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
