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
  return (
    <>
      <div className="">
        <div className="">Task Manager</div>
        <div className="">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            useOneTap
            theme="filled_black"
          />
        </div>
      </div>
    </>
  );
}
