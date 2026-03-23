import { useState } from "react";
import type { GoogleUser } from "../types/googleUser.js";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
interface props {
  user: GoogleUser | null;
  setUser: React.Dispatch<React.SetStateAction<GoogleUser | null>>;
}
export default function Navbar({ user, setUser }: props) {
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${response.access_token}` },
          },
        );
        const userData = await res.json();
        const useredata: GoogleUser = {
          name: userData.name,
          email: userData.email,
          firstname: userData.given_name,
          picture: userData.picture,
          sub: userData.sub,
        };
        setUser(useredata);
      } catch (error) {}
    },
  });

  function logout() {
    googleLogout();
    setUser(null);
  }
  return (
    <>
      <nav className=" w-full z-50 border-b border-white/10 bg-black px-4 py-3">
        <div className="flex justify-between mx-auto">
          <div className="font-display font-extrabold text-2xl text-white tracking-tight">
            Task Manager
          </div>

          <div>
            {user ? (
              <div className="flex items-center gap-3">
                <img
                  src={user.picture}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full border border-white/20"
                />
                <span className="text-sm text-white hidden sm:block">
                  {user.firstname}
                </span>
                <button
                  onClick={logout}
                  className="text-lg text-white hover:text-white/60 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => login()}
                className="bg-white text-black text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/90 transition-colors"
              >
                Sign in with Google
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
