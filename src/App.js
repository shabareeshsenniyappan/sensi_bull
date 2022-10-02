import "./App.css";
import Index from "./Pages/Index";
import Header from "./Components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Quotes from "./Pages/Quotes";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/quotes/:symbol" element={<Quotes />} />
      </Routes>
    </>
  );
}

export default App;
