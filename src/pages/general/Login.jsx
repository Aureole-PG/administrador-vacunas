import { useContext } from "react";
import { Form, Input, Button } from "antd";
import { AuthContext } from "../../auth/AuthContext";
export const Login = () => {
  const { login } = useContext(AuthContext);
  const onFinish = (values) => {
    login(values.usuario, values.contraseña);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="windows-heigth center-content  ">
      <h1>registro de vacuna</h1>
      <Form
        name="login"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Usuario"
          name="usuario"
          rules={[
            {
              required: true,
              message: "Ingresa tu nombre de usuario",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="contraseña"
          rules={[
            {
              required: true,
              message: "Ingresa tu contraseña",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
