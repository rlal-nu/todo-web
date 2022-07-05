import React from "react";


const TaskListContext = React.createContext({
    taskList: [],
    setTaskList: (value: any)=>{}
})

export default TaskListContext;
