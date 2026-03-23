import { useState } from "react";
import Navbar from "./components/navbar.js";
import TaskInput from "./components/taskinput.js";
import type { GoogleUser } from "./types/googleUser.js";

function App() {
  const [user, setUser] = useState<GoogleUser | null>(null);
  return (
    <>
      <div className="">
        <Navbar user={user} setUser={setUser} />
        <TaskInput user={user} />
      </div>
    </>
  );
}

export default App;
