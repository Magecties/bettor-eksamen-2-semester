import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function loadProfile() {
      if (!session?.user?.id) {
        setProfile(null);
        return;
      }
      const query = `/users?auth_id=eq.${session.user.id}&select=*`;
      const response = await fetch(URL + query, { headers });
      const data = await response.json();
      setProfile(data[0] ?? null);
    }
    loadProfile();
  }, [session]);

  async function signIn(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error;
  }

  async function signUp(email, password, name, username) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return error;

    if (data.user) {
      const insertRes = await fetch(URL + "/users", {
        method: "POST",
        headers: { ...headers, Prefer: "return=representation" },
        body: JSON.stringify({
          auth_id: data.user.id,
          name,
          username,
        }),
      });
      if (!insertRes.ok) {
        const text = await insertRes.text();
        return { message: text };
      }
    }
    return null;
  }

  async function signOut() {
    await supabase.auth.signOut();
    setProfile(null);
  }

  return (
    <AuthContext.Provider value={{ session, profile, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
