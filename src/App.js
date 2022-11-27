import React, { useEffect, useState, useCallback } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState(false);

  const {isLoading, error, sendRequest:fetchTasks} = useHttp();


  // costome hookに入れる前のfecthtasksはstateのset funtionしか入ってなかったので、dependencyを入れる必要はなかったけど、customehookに移動してからは、Reactは、fetchtasksが何をするのかわからないので、dependencyに入れる
  useEffect(() => {
    const transformTasks = (tasksObj) => {
      const loadedTasks = [];
  
      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }
  
      setTasks(loadedTasks);
    };

    fetchTasks({ url: "https://custome-hooks-74a3d-default-rtdb.firebaseio.com/tasks.json"}, transformTasks);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
