import { useRef } from "react";
import type { GoogleUser } from "../types/googleUser.js";

interface props {
  user: GoogleUser | null;
}
export default function TaskInput({ user }: props) {
  const taskRef = useRef<HTMLInputElement>(null);
  const userEmail = user?.email;
  

  function handleTasks() {
    if (!taskRef.current) return;
    console.log(userEmail);
    taskRef.current.value = "";
  }
  return (
    <>
      <div className="">
        <div className="">
          <input
            ref={taskRef}
            type="text"
            className="bg-black text-white text-lg"
          />
          <button onClick={handleTasks}>add task</button>
        </div>
      </div>
    </>
  );
}
