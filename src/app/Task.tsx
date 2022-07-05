import { Button, Divider, List, notification, Typography } from "antd";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { AddTaskModal } from "./AddTaskModal";
import { BASE_URL } from "./shared/constant";

export const Task = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const [taskList, setTaskList] = useState([]);
  const [showAddTaskModel, setShowAddTaskModel] = useState(false);

  
  const viewDetails = (itemId: any)=>{
    
  }
  useMemo(() => {
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
      <Divider orientation="left">
        List Of Task (Click on view to see details)
      </Divider>
      <List
        bordered
        dataSource={taskList}
        renderItem={(item: any) => (
          <List.Item>
            {item.title} <Button type="link" htmlType="button" onClick={()=>viewDetails(item._id)}>
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
        taskList={taskList}
        setTaskList={setTaskList}
      />
    </>
  );
};
