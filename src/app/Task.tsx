import { Button, Divider, List, notification, Typography } from "antd";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { BASE_URL } from "./shared/constant";

export const Task = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const [taskList, setTaskList] = useState([]);
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
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={taskList}
        renderItem={(item: any) => (
          <List.Item>
            {item.title} <a>view details</a>
          </List.Item>
        )}
      />
      <br></br>
      <Button type="primary" htmlType="submit">
        Add new task
      </Button>
    </>
  );
};
