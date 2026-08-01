import { createContext, useEffect, useState, type ReactNode } from "react";
import type { AuthError, User } from "@supabase/auth-js";
import { supabase } from "@/lib/supabaseClient";

type Props = {
  children: ReactNode;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn(email: string, password: string): Promise<AuthError | null>;
  signUp(email: string, password: string): Promise<AuthError | null>;
  signOut(): Promise<AuthError | null>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error;
  };
  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    return error;
  };
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return error;
  };

  return <AuthContext value={{ user, loading, signIn, signUp, signOut }}>{children}</AuthContext>;
};
