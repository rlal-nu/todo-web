import { Button, Divider, List, notification, Typography } from "antd";
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { AddTaskModal } from "./AddTaskModal";
import TaskListContext from "./shared/TaskListContext";
import { BASE_URL } from "./shared/constant";
import { ViewTaskModal } from "./ViewTaskModal";
import { BrowserRouter, useNavigate } from "react-router-dom";

export const Task = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [taskList, setTaskList]: any = useState([]);
  const [showAddTaskModel, setShowAddTaskModel] = useState(false);
  const [showViewTaskModel, setShowViewTaskModel] = useState(false);
  const [currentSelectedTaskIndex, setCurrentSelectedTaskIndex] = useState(-1);

  const viewDetails = (itemId: any) => {
    const currentSelectedTaskIndex = taskList.findIndex((item: any) => {
      return item._id === itemId;
    });
    if (currentSelectedTaskIndex !== -1) {
      setCurrentSelectedTaskIndex(currentSelectedTaskIndex);
      setShowViewTaskModel(true);
    }
  };
  const navigate = useNavigate();
  const onLogout = () => {
    removeCookie("token");
    notification.open({
      message: "Logged Out",
      description: "You have been logged out",
    });
    navigate("/login")
  };
  useMemo(() => {
    if (!cookies.token) {
      notification.open({
        message: "Unauthorised",
        description: "Please login to view the task.",
      });
      navigate("/login");
    }
    axios
      .get(`${BASE_URL}/task`, {
        headers: {
          token: cookies.token,
        },
      })
      .then((res) => {
        setTaskList(res.data || []);
      })
      .catch((error) => {
        notification.open({
          message: error.code,
          description: JSON.stringify(error?.response?.data),
        });
      });
  }, []);
  return (
    <>
      <TaskListContext.Provider value={{ taskList, setTaskList }}>
        <Divider orientation="left">
          List Of Task (Click on view to see details)
        </Divider>
        <Divider orientation="right">
          <Button type="ghost" htmlType="submit" onClick={onLogout}>
            Logout
          </Button>
        </Divider>
        <List
          bordered
          dataSource={taskList}
          renderItem={(item: any) => (
            <List.Item>
              {item.title}{" "}
              <Button
                type="link"
                htmlType="button"
                onClick={() => viewDetails(item._id)}
              >
                View Details
              </Button>
            </List.Item>
          )}
        />
        <br></br>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            setShowAddTaskModel(true);
          }}
        >
          Add new task
        </Button>
        <AddTaskModal
          setShowAddTaskModel={setShowAddTaskModel}
          showAddTaskModel={showAddTaskModel}
        />
        <ViewTaskModal
          taskDetails={taskList[currentSelectedTaskIndex]}
          setShowViewTaskModel={setShowViewTaskModel}
          showViewTaskModel={showViewTaskModel}
        ></ViewTaskModal>
      </TaskListContext.Provider>
    </>
  );
};
