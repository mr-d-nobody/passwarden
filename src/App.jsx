import React from "react";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-neutral-900 text-white">
      <Navbar />
      <div className="flex-1 overflow-hidden pt-16 pb-12">
        <Manager />
      </div>
      <Footer />
    </div>
  );
}

export default App;
