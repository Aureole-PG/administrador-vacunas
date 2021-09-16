import { Form, Input, Button, InputNumber } from "antd";
import { validarCedula, validarString } from "../../../utils/validators";

export const UserForm = ({ data, submitFunc, loading }) => {
  const onFinish = (values) => {
    submitFunc(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const validatorCI = async (rule, value) => {
    const state = validarCedula(value);
    if (state === false || state === undefined) {
      throw new Error("Cédula invalida");
    }
  };
  const validatorText = async (rule, value) => {
    const validate = validarString(value);
    if (value == null) return;
    if (!validate) throw new Error("Utilizar solo letras");
  };
  return (
    <Form
      style={{ width: "100%" }}
      name="usuario"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={{
        nombre: data?.nombre ?? "",
        apellido: data?.apellido ?? "",
        cedula: data?.cedula ?? "",
        email: data?.email ?? "",
      }}
    >
      <Form.Item
        label="Nombres"
        name="nombre"
        rules={[
          {
            required: true,
            message: "El nombre es requerido",
          },
          {
            message: "Solo se permiten letras",
            validator: validatorText,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Apellidos"
        name="apellido"
        rules={[
          {
            required: true,
            message: "El apellido es requerido",
          },
          {
            message: "Solo se permiten letras",
            validator: validatorText,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Cédula"
        name="cedula"
        rules={[
          {
            required: true,
            message: "Cédula es requerida",
            type: "number",
          },
          {
            message: "Ingrese un cédula válida",
            validator: validatorCI,
          },
        ]}
      >
        <InputNumber disabled={data ? true : false} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Ingrese un email válido",
            type: "email",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button loading={loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
