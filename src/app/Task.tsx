import { Button, Divider, List, Typography } from "antd";

export const Task = () => {
  const list: any[] | undefined = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
  ];
  return (
    <>
      <Divider orientation="left">
        List Of Task (Click on view to see details)
      </Divider>
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={list}
        renderItem={(item) => <List.Item>{item} <a>view details</a></List.Item>}
      /><br></br>
      <Button type="primary" htmlType="submit">
        Add new task
      </Button>
    </>
  );
};
