import "./App.css";
import { BrowserRouter } from "react-router";
import { Router } from "./router/Router";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
