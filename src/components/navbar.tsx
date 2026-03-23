import { useState } from "react";
import type { GoogleUser } from "../types/googleUser.js";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

export default function Navbar() {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const handleGoogleSuccess = async (response: any) => {
    try {
      console.log(response);
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${response.access_token}` },
      });
      const userData = await res.json();
      const useredata: GoogleUser = {
        name: userData.name,
        email: userData.email,
        firstname: userData.given_name,
        picture: userData.picture,
        sub: userData.sub,
      };
      setUser(useredata);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  function logout() {
    setUser(null);
  }
  return (
    <>
      <nav className=" w-full z-50 border-b border-white/10 bg-black px-4 py-3">
        <div className="flex justify-between mx-auto">
          <div className="font-display font-extrabold text-2xl text-white tracking-tight">
            TaskForge
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
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                useOneTap
                theme="filled_black"
              />
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
