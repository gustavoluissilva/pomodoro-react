import { useState, useEffect, useRef } from "react";
import TimerLib from "easytimer.js";
import "./App.css";

import Button from "./components/button";
import Timer from "./components/timer";
import TaskList from "./components/TaskList.jsx";
import DigitalClock from "./components/digitalClock";

function App() {
  const [time, setTime] = useState("25:00");
  const [cycle, setCycle] = useState("pomodoro");
  const [isRunning, setIsRunning] = useState(false);

  const [taskList, setTaskList] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);

  const timerRef = useRef(null);
  const timeMappings = {
    pomodoro: "25:00",
    curta: "05:00",
    longa: "15:00",
  };

  useEffect(() => {
    timerRef.current = new TimerLib();
  }, []);

  const startTimer = () => {
    if (timerRef.current) {
      timerRef.current.start({
        countdown: true,
        startValues: { minutes: time },
      });

      timerRef.current.addEventListener("secondsUpdated", () => {
        setTime(
          timerRef.current.getTimeValues().toString(["minutes", "seconds"])
        );
      });

      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    timerRef.current.pause();
    setIsRunning(false);
  };

  const stopTimer = () => {
    const zerarTime = timeMappings[cycle];
    timerRef.current.stop();
    setTime(zerarTime);
    setIsRunning(false);
  };

  const addNewTask = () => {
    // A nova tarefa já entra no modo de edição (isEditing: true)
    const newTask = {
      id: Date.now(),
      text: "",
      completed: false, // Inicia como não concluída
      isEditing: true,
    };
    setTaskList([...taskList, newTask]);
  };

  // Mudar o Status de Conclusão da Tarefa
  const toggleTaskCompletion = (id) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTaskText = (id, text) => {
    if (!text.trim() && taskList.length > 0) {
      setTaskList(taskList.filter((task) => task.id !== id));
      return;
    }

    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, text: text.trim(), isEditing: false } : task
      )
    );
  };

  const tasksToDisplay = taskList.filter((task) =>
    showCompleted ? true : !task.completed
  );

  return (
    <>
      <div className="container">
        <div className="timer">
          <div>
            <h1>Pomodoro 2025.2</h1>

            <div className="digital-clock">
              <DigitalClock />
            </div>

            <Button
              onClick={() => {
                setTime("25:00");
                setCycle("pomodoro");
              }}
              label="Pomodoro"
              isLink
              isActive={cycle == "pomodoro"}
            />
            <Button
              onClick={() => {
                setTime("05:00");
                setCycle("curta");
              }}
              label="Pausa curta"
              isLink
              isActive={cycle == "curta"}
            />
            <Button
              onClick={() => {
                setTime("15:00");
                setCycle("longa");
              }}
              label="Pausa longa"
              isLink
              isActive={cycle == "longa"}
            />
          </div>
          <Timer time={time} />

          <div>
            {!isRunning ? (
              <Button
                onClick={startTimer}
                label="Iniciar"
                isLink
                isLarge
                isActive
              />
            ) : (
              <Button
                onClick={pauseTimer}
                label="Pausar"
                isLink
                isLarge
                isActive
              />
            )}
            <Button onClick={stopTimer} label="Zerar" isLink />
          </div>
        </div>

        <div className="counter__box">
          <div className="container">
            <div className="task-container">
              <h2>📋 Lista de Tarefas</h2>

              <Button
                onClick={addNewTask}
                label="Nova Tarefa"
                isLink
                isActive
              />

              <Button
                onClick={() => setShowCompleted(!showCompleted)}
                label={
                  showCompleted ? "Ocultar Concluídas" : "Mostrar Concluídas"
                }
                isLink
                isActive={!showCompleted}
                style={{ marginLeft: "10px" }}
              />

              <TaskList
                tasks={tasksToDisplay}
                onToggleCompletion={toggleTaskCompletion}
                onUpdateText={updateTaskText}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
