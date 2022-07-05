import {
  Button,
  Form,
  Input,
  Layout,
  notification,
  Row,
  Typography,
} from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL, EMAIL_REGEX, PASSWORD_REGEX } from "./shared/constant";
import { useNavigate } from "react-router-dom";

export const Regsiter = () => {
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormValue({
      ...formValue,
      ...{
        [field]: value,
      },
    });
  };
  
  const onSubmit = () => {
    const errors: any = {};
    if (formValue.firstName.length === 0) {
      errors.firstName = "First name can not be empty";
    }
    if (formValue.email.length === 0) {
      errors.email = "Email field can not be empty";
    } else if (!formValue.email.toLowerCase().match(EMAIL_REGEX)) {
      errors.email = "Not a valid email id";
    }
    if (formValue.password.length === 0) {
      errors.password = "Password field can not be empty";
    } else if (!formValue.password.match(PASSWORD_REGEX)) {
      errors.password =
        "Password must contains atleast one number, one uppercase and one special character";
    }
    setErrorMessage(errors);
    // if(Object.keys(errors).length === 0){
    submitForm();
    // }
  };

  const submitForm = () => {
    axios
      .post(`${BASE_URL}/auth/register`, formValue)
      .then((res) => {
        if (res.status === 200) {
          notification.open({
            message: "Registration Successful",
            description:
              "Your registration is successful, please login to the application",
          });
        }
      })
      .catch((error) => {
        notification.open({
          message: error.code,
          description: JSON.stringify(error?.response?.data),
        });
      });
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <Layout>
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          autoComplete="off"
        >
          <Form.Item label="First Name" name="firstName">
            <Input
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
            {errorMessage && errorMessage["firstName"] && (
              <Typography.Text type="danger">
                {errorMessage["firstName"]}
              </Typography.Text>
            )}{" "}
          </Form.Item>
          <Form.Item label="Last Name" name="lastName">
            <Input onChange={(e) => handleChange("lastName", e.target.value)} />
            {errorMessage && errorMessage["lastName"] && (
              <Typography.Text type="danger">
                {errorMessage["lastName"]}
              </Typography.Text>
            )}{" "}
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input onChange={(e) => handleChange("email", e.target.value)} />
            {errorMessage && errorMessage["email"] && (
              <Typography.Text type="danger">
                {errorMessage["email"]}
              </Typography.Text>
            )}{" "}
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password
              onChange={(e) => handleChange("password", e.target.value)}
            />
            {errorMessage && errorMessage["password"] && (
              <Typography.Text type="danger">
                {errorMessage["password"]}
              </Typography.Text>
            )}{" "}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={onSubmit}>
              Register
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="link" htmlType="button" onClick={navigateToLogin}>
              Already have an account ?, Login here
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </Layout>
  );
};
