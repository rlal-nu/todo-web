import { Form, Input, Modal, notification } from "antd";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { BASE_URL } from "./shared/constant";

export const AddTaskModal = ({
  setShowAddTaskModel,
  showAddTaskModel,
  taskList,
  setTaskList,
}: any) => {
  const [cookies] = useCookies(["token"]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTask = () => {
    console.log(title, description);
    axios
      .post(
        `${BASE_URL}/task`,
        {
          title,
          description,
        },
        {
          headers: {
            token: cookies.token,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          notification.open({
            message: "Task Added",
            description: "Task added successfully",
          });
          setShowAddTaskModel(false);
          setTaskList([...taskList, res.data]);
          setTitle('')
          setDescription('')
        }
      })
      .catch((error) => {
        notification.open({
          message: error.code,
          description: JSON.stringify(error?.response?.data),
        });
      });
  };
  return (
    <Modal
      title="Basic Modal"
      visible={showAddTaskModel}
      onOk={() => addTask()}
      onCancel={() => {
        setShowAddTaskModel(false);
      }}
    >
      <Form>
        <Form.Item label="Title" name="title">
          <Input onChange={(e) => setTitle(e.target.value)} value={title} />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input onChange={(e) => setDescription(e.target.value)} value={description} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
