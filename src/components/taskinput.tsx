import { useRef, useState } from "react";
import type { GoogleUser } from "../types/googleUser.js";
import type { Tasks } from "../types/tasksUser.js";

interface props {
  user: GoogleUser | null;
}
export default function TaskInput({ user }: props) {
  if (!user) return;
  const taskRef = useRef<HTMLInputElement>(null);
  const userEmail = user.email;

  //   console.log(prevData);
  const [usertasks, setUsertasks] = useState<Tasks[]>(() => {
    const prevData = localStorage.getItem(`${userEmail}`);
    return JSON.parse(prevData!);
  });
  const prevData = localStorage.getItem(`${userEmail}`);
  let tasks: Tasks[] = prevData ? JSON.parse(prevData) : [];
  function handleTasks() {
    if (!taskRef.current) return;
    tasks.push({
      email: userEmail,
      name: taskRef.current.value,
      status: false,
      uuid: Date.now(),
    });
    localStorage.setItem(`${userEmail}`, JSON.stringify(tasks));
    setUsertasks(tasks);
    console.log(tasks);
    taskRef.current.value = "";
  }

  function handleDone(id: number) {
    const updatedTasks = JSON.parse(localStorage.getItem(`${userEmail}`)!);
    updatedTasks.forEach((i: any) => {
      if (id == i.uuid) {
        i.status = !i.status;
      }
    });
    setUsertasks(updatedTasks);
  }
  return (
    <>
      <div className="">
        <div className="flex">
          <input
            ref={taskRef}
            type="text"
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                e.preventDefault();
                handleTasks();
              }
            }}
            className="bg-black text-white text-lg"
          />
          <button onClick={handleTasks}>add task</button>
        </div>
        <div className="text-black bg-red w-full">
          {tasks.map((i) => {
            return (
              <div className="flex">
                <div className="text-black">{i.name}</div>
                <button
                  onClick={() => handleDone(i.uuid)}
                  className="bg-blue-500 rounded-2xl"
                >
                  {i.status ? "mark as pending" : "mark as done"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
