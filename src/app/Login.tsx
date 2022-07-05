import {
  Button,
  Checkbox,
  Form,
  Input,
  Layout,
  notification,
  Row,
  Typography,
} from "antd";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { BASE_URL, EMAIL_REGEX, PASSWORD_REGEX } from "./shared/constant";

export const Login = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);

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
    if (Object.keys(errors).length === 0) {
      submitForm();
    }
  };

  const submitForm = () => {
    axios
      .post(`${BASE_URL}/auth/login`, formValue)
      .then((res) => {
        if (res.status === 200) {
          notification.open({
            message: "Login Successful",
            description: "Your login is successful, navigating to task page",
          });
          setCookie("token", res.data?.token, { path: "/" });
          navigate("/task");
        }
      })
      .catch((error) => {
        notification.open({
          message: error.code,
          description: JSON.stringify(error?.response?.data),
        });
      });
  };

  const navigateToRegister = () => {
    navigate("/register");
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
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
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
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="link" htmlType="button" onClick={navigateToRegister}>
              Dont have an account ?, Register here
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </Layout>
  );
};
