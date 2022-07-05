import { Form, Modal, Typography } from "antd";


export const ViewTaskModal = ({
  taskDetails,
  showViewTaskModel,
  setShowViewTaskModel,
}: any) => {
  return (
    <Modal
      title="View Task"
      visible={showViewTaskModel}
      onCancel={() => {
        setShowViewTaskModel(false);
      }}
    >
      <Form>
        <Form.Item label="Title" name="title">
          <Typography.Text type="secondary">
            {taskDetails?.title}
          </Typography.Text>
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Typography.Text type="secondary">
            {taskDetails?.description}
          </Typography.Text>
        </Form.Item>
        <Form.Item label="Created Date" name="createdAt">
          <Typography.Text type="secondary">
            {taskDetails?.createdDate}
          </Typography.Text>
        </Form.Item>
      </Form>
    </Modal>
  );
};
