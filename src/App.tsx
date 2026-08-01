import { BrowserRouter } from "react-router";
import { Router } from "./app/Router";
import { Toaster } from "./components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "./features/auth/providers/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Router />
          <Toaster />
          <Analytics />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
