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
  const [show, setShow] = useState();

  //   console.log(prevData);
  const [usertasks, setUsertasks] = useState<Tasks[]>(() => {
    const prevData = localStorage.getItem(`${userEmail}`);
    return JSON.parse(prevData!);
  });
  const prevData = localStorage.getItem(`${userEmail}`);
  let tasks: Tasks[] = prevData ? JSON.parse(prevData) : [];
  const [selectedTasks, setSelectedTasks] = useState<Tasks[]>(tasks);

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
    localStorage.setItem(`${userEmail}`, JSON.stringify(updatedTasks));
    setUsertasks(updatedTasks);
    console.log(updatedTasks);
  }

  function deleteTask(id: number) {
    const tasks = JSON.parse(localStorage.getItem(`${userEmail}`)!);
    const remaningTasks = tasks.filter((i: any) => i.uuid != id);
    localStorage.setItem(`${userEmail}`, JSON.stringify(remaningTasks));
    setUsertasks(remaningTasks);
  }

  function showAll() {
    setSelectedTasks(tasks);
  }

  function showPending() {
    const pendingtasks = tasks.filter((i) => !i.status);
    console.log(pendingtasks);
    setSelectedTasks(pendingtasks);
  }

  function showCompleted() {
    const completedtasks = tasks.filter((i) => i.status);
    console.log(completedtasks);
    setSelectedTasks(completedtasks);
  }

  return (
    <>
      <div className="p-4 max-w-2xl mx-auto">
        <div className="flex gap-2 mb-6">
          <input
            ref={taskRef}
            type="text"
            placeholder="add a task"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleTasks();
              }
            }}
            className="flex-1 bg-black border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm placeholder-white/30 focus:border-white/25 transition-colors"
          />
          <button
            onClick={handleTasks}
            className="bg-black text-white hover:bg-black/80 text-sm font-medium px-4 py-2.5 rounded-lg whitespace-nowrap"
          >
            Add task
          </button>
        </div>
        <div className="flex justify-evenly mb-5">
          <button
            onClick={showAll}
            className="bg-black text-white w-30 p-1 text-lg rounded-xl border focus:border-white"
          >
            All
          </button>
          <button
            onClick={showPending}
            className="bg-black text-white w-30 p-1 text-lg rounded-xl border focus:border-white"
          >
            Pending
          </button>
          <button onClick={showCompleted} className="bg-black text-white w-30 p-1 text-lg rounded-xl border focus:border-white">
            Completed
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {selectedTasks.map((i: any) => (
            <div
              key={i.uuid}
              className="flex items-center gap-3 bg-black border border-white/8 rounded-lg px-4 py-3 group"
            >
              <button
                onClick={() => handleDone(i.uuid)}
                className={`w-5 h-5 rounded-md border-[1.5px] flex items-center justify-center shrink-0 transition-all ${
                  i.status
                    ? "bg-green-700 border-green-700"
                    : "bg-red-700 border-red-700 "
                }`}
              ></button>
              <h2
                className={`flex-1 text-lg break-words ${
                  i.status ? "line-through text-white/30" : "text-white/90"
                }`}
              >
                {i.name}
              </h2>
              <button
                onClick={() => deleteTask(i.uuid)}
                className="bg-white text-xs hover:scale-[1.03] rounded-xl p-1 duration-200"
              >
                delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
