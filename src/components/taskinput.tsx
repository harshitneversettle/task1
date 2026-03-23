import { useRef, useState } from "react";
import type { GoogleUser } from "../types/googleUser.js";
import type { Tasks } from "../types/tasksUser.js";
import DOMPurify from "dompurify";

interface props {
  user: GoogleUser | null;
}
export default function TaskInput({ user }: props) {
  if (!user) return;
  const taskRef = useRef<HTMLInputElement>(null);
  const userEmail = user.email;
  const prevData = localStorage.getItem(`${userEmail}`);
  console.log(prevData);
  const [usertasks, setUsertasks] = useState<Tasks[]>(() => {
    return prevData ? JSON.parse(prevData) : [];
  });
  const [selectedTasks, setSelectedTasks] = useState<Tasks[]>(usertasks);
  const [filter, setFilter] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<
    "All" | "pending" | "completed"
  >("All");
  const editRef = useRef<HTMLInputElement>(null);
  const [showEditinput, setShowEditinput] = useState<[boolean, number]>([
    false,
    0,
  ]);

  function handleTasks() {
    if (!taskRef.current) return;
    if (taskRef.current.value.length == 0) return;
    const purifirdValue = DOMPurify.sanitize(taskRef.current.value);
    const newTasks = [
      ...usertasks,
      {
        email: userEmail,
        name: purifirdValue,
        status: false,
        uuid: Date.now(),
      },
    ];
    setUsertasks(newTasks);
    localStorage.setItem(`${userEmail}`, JSON.stringify(newTasks));
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
  }

  function deleteTask(id: number) {
    const tasks = JSON.parse(localStorage.getItem(`${userEmail}`)!);
    const remaningTasks = tasks.filter((i: any) => i.uuid != id);
    localStorage.setItem(`${userEmail}`, JSON.stringify(remaningTasks));
    setUsertasks(remaningTasks);
  }

  function showPending() {
    setFilter(true);
    const pendingtasks = usertasks.filter((i) => !i.status);
    setSelectedTasks(pendingtasks);
  }

  function showCompleted() {
    setFilter(true);
    const completedtasks = usertasks.filter((i) => i.status);
    setSelectedTasks(completedtasks);
  }

  function handleEdit(id: number) {
    if (!editRef.current) return;
    const newText = DOMPurify.sanitize(editRef.current.value);
    const tasks = JSON.parse(localStorage.getItem(`${userEmail}`)!);
    console.log(tasks);
    tasks.forEach((i: any) => {
      if (i.uuid == id) {
        i.name = newText;
      }
    });
    setUsertasks(tasks);
    localStorage.setItem(`${userEmail}`, JSON.stringify(tasks));
    editRef.current.value = "";
    setShowEditinput([false, 0]);
  }

  return (
    <>
      <div className="w-full min-h-screen bg-zinc-900">
        <div className="p-4 max-w-2xl mx-auto ">
          <div className="flex gap-2 mb-6">
            <input
              ref={taskRef}
              type="text"
              maxLength={200}
              placeholder="add a task"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleTasks();
                }
              }}
              className="flex-1 bg-black border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm md:text-lg placeholder-white/60 focus:border-white/25 transition-colors"
            />
            <button
              onClick={handleTasks}
              className="bg-black text-white hover:bg-black/80 text-sm md:text-lg font-medium px-4 py-2.5 rounded-lg whitespace-nowrap hover:border-white"
            >
              Add task
            </button>
          </div>
          <div className="flex justify-evenly mb-5">
            <button
              onClick={() => {
                setFilter(false);
                setSelectedFilter("All");
              }}
              className={`bg-black text-white w-24 md:w-30 p-1 text-md md:text-lg rounded-xl border-2 ${selectedFilter == "All" ? `border-red-600` : ``}`}
            >
              All
            </button>
            <button
              onClick={() => {
                showPending();
                setSelectedFilter("pending");
              }}
              className={`bg-black text-white w-24 md:w-30 p-1 text-md md:text-lg rounded-xl border-2  ${selectedFilter == "pending" ? `border-red-600` : ``}`}
            >
              Pending
            </button>
            <button
              onClick={() => {
                showCompleted();
                setSelectedFilter("completed");
              }}
              className={`bg-black text-white w-24 md:w-30 p-1 text-md md:text-lg rounded-xl border-2 ${selectedFilter == "completed" ? `border-red-600` : ``}`}
            >
              Completed
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {filter ? (
              selectedTasks.length != 0 ? (
                selectedTasks.map((i: any) => (
                  <div
                    key={i.uuid}
                    className="max-w-160 min-w-0 flex items-center gap-3 bg-black border border-white/8 rounded-lg px-4 py-3 group"
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
                      className={`flex-1 text-lg break-all  ${
                        i.status
                          ? "line-through text-white/30"
                          : "text-white/90"
                      }`}
                    >
                      {i.name}
                    </h2>
                    <button
                      onClick={() => deleteTask(i.uuid)}
                      className="bg-white text-sm rounded-xl p-1 "
                    >
                      delete
                    </button>
                  </div>
                ))
              ) : (
                <h1 className="text-white text-lg items-center mx-auto pt-20">
                  nothing is here
                </h1>
              )
            ) : usertasks.length != 0 ? (
              usertasks.map((i: any) => (
                <div className="">
                  <div
                    key={i.uuid}
                    className="flex max-w-160 min-w-160 items-center gap-3 bg-black border border-white/8 rounded-lg px-4 py-3 group"
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
                      className={`flex-1 text-lg break-all ${
                        i.status
                          ? "line-through text-white/30"
                          : "text-white/90"
                      }`}
                    >
                      {i.name}
                    </h2>
                    <button
                      onClick={() => {
                        setShowEditinput([true, i.uuid]);
                      }}
                      className="bg-white text-sm rounded-xl p-1 "
                    >
                      edit
                    </button>
                    <button
                      onClick={() => deleteTask(i.uuid)}
                      className="bg-white text-xs hover:scale-[1.03] rounded-xl p-1 duration-200"
                    >
                      delete
                    </button>
                  </div>
                  {showEditinput[0] == true && showEditinput[1] == i.uuid && (
                    <div className="flex w-160 mt-2 mb-2 gap-3">
                      <input
                        ref={editRef}
                        type="text"
                        onKeyDown={(e) => {
                          if (e.key == "Enter") {
                            e.preventDefault();
                            handleEdit(i.uuid);
                          }
                        }}
                        name=""
                        id=""
                        className="text-md bg-white w-140 rounded-md "
                      />
                      <button
                        onClick={() => {
                          handleEdit(i.uuid);
                          setShowEditinput([false, 0]);
                        }}
                        className="bg-black text-white text-md px-2 py-1 rounded-xl hover:bg-black/20 "
                      >
                        edit{" "}
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <h1 className="text-white items-center text-lg mx-auto pt-20">
                Add tasks
              </h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
