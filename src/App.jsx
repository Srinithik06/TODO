import { useState } from "react"

export default function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [tab, setTab] = useState("all")

  // Add task
  const addTask = () => {
    if (task.trim() === "") return
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        checked: false,
        completed: false,
      },
    ])
    setTask("")
  }

  // Toggle checkbox (not completion)
  const toggleCheck = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, checked: !t.checked } : t
      )
    )
  }

  // Confirm completion
  const confirmTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, completed: true, checked: false }
          : t
      )
    )
  }

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  // Derived lists
  const activeTasks = tasks.filter((t) => !t.completed)
  const completedTasks = tasks.filter((t) => t.completed)

  const visibleTasks =
    tab === "all"
      ? tasks
      : tab === "active"
      ? activeTasks
      : completedTasks

  // Progress
  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks.length / tasks.length) * 100)

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-slate-950">

      {/* ===== Gradient Blobs (UNCHANGED) ===== */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] bg-indigo-600/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      {/* ===== Falling Rolling Triangles (UNCHANGED) ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(45)].map((_, i) => (
          <span
            key={i}
            className="triangle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${14 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* ===== Content Wrapper ===== */}
      <div className="relative z-10 w-full max-w-md">

        {/* ===== Progress Bar (NEW, minimal) ===== */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-white/70 mb-1">
            <span>{progress}% tasks completed</span>
            <span>{completedTasks.length}/{tasks.length}</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                progress === 100 ? "bg-green-400" : "bg-indigo-400"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* ===== Todo Card (EXACT SAME GLASS COLORS) ===== */}
        <div
  className="
    bg-gradient-to-br
    from-blue-900/60
    via-indigo-900/55
    to-slate-900/60
    backdrop-blur-2xl
    rounded-2xl p-7
    shadow-[0_25px_60px_rgba(0,0,0,0.5)]
    border border-white/10
  "
>

          <h1 className="text-xl font-medium text-center text-white/90 mb-4">
            Todo List
          </h1>

          {/* Input */}
          <div className="flex gap-2 mb-4">
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Add a new task..."
              className="
                flex-1 rounded-lg px-3 py-2
                bg-black/20 text-white placeholder-white/60
                border border-white/20
                focus:outline-none focus:ring-2 focus:ring-indigo-400
              "
            />
            <button
              onClick={addTask}
              className="
                px-4 rounded-lg
                bg-indigo-500/80 text-white
                hover:bg-indigo-500 transition
              "
            >
              Add
            </button>
          </div>

          {/* Tabs */}
          <div className="flex justify-between text-sm text-white/70 mb-3">
            <button onClick={() => setTab("all")}>
              All ({tasks.length})
            </button>
            <button onClick={() => setTab("active")}>
              Active ({activeTasks.length})
            </button>
            <button onClick={() => setTab("completed")}>
              Completed ({completedTasks.length})
            </button>
          </div>

          {/* Task List */}
          {visibleTasks.length === 0 ? (
            <p className="text-white/50 text-center">
              No tasks here
            </p>
          ) : (
            <ul className="space-y-2">
              {visibleTasks.map((t) => (
                <li
  key={t.id}
  className="
    flex items-center justify-between
    bg-gradient-to-br from-white/10 to-white/5
    backdrop-blur-md
    px-4 py-3
    rounded-xl
    border border-white/10
    shadow-sm
  "
>

                  <div className="flex items-center gap-2">
                    {!t.completed && (
                      <input
                        type="checkbox"
                        checked={t.checked}
                        onChange={() => toggleCheck(t.id)}
                      />
                    )}
                    <span
                      className={`text-white/90 ${
                        t.completed ? "line-through opacity-50" : ""
                      }`}
                    >
                      {t.text}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {!t.completed && t.checked && (
                      <button
                        onClick={() => confirmTask(t.id)}
                        className="text-green-400 hover:text-green-500"
                      >
                        Confirm
                      </button>
                    )}
                    <button
                      onClick={() => deleteTask(t.id)}
                      className="text-red-400 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
