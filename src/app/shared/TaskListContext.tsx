import React from "react";


const TaskListContext = React.createContext({
    taskList: [],
    setTaskList: (data: any)=>{}
})

export default TaskListContext;
