import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/auth-js";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
  }, []);

  if (loading) return null;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
