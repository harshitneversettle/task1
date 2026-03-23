import { useRef } from "react";

export default function TaskInput() {
  const taskRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <div className="">
        <div className="">
          <input ref={taskRef} type="text" />
          {/* <button onClick={handleTasks}>add task</button> */}
        </div>
      </div>
    </>
  );
}
