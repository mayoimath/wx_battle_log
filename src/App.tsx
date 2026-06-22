import { BrowserRouter } from "react-router";
import { Router } from "./app/Router";
import { Toaster } from "./components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
        <Toaster />
        <Analytics />
      </BrowserRouter>
    </>
  );
}

export default App;
