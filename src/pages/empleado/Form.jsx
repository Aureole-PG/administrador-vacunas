import { useState, useEffect, useContext } from "react";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Row,
  Col,
  DatePicker,
  Select,
  Space,
} from "antd";
import { useHistory } from "react-router";
import { updateUser_ } from "../../store/users";
import { AuthContext } from "../../auth/AuthContext";
import moment from "moment";
const { Option } = Select;
const ActualizarDatos = () => {
  const { UpdateData, auth } = useContext(AuthContext);
  const history = useHistory();
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const onFinish = (values) => {
    const resp = updateUser_(values, userData.cedula);
    if (resp) {
      UpdateData();
      history.push("/route");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleChange = (e) => {
    console.log(e);
    if (e == "vacunado") {
      setState(true);
    } else {
      setState(false);
    }
  };
  useEffect(() => {
    setLoading(false);
    setUserData(auth.user);
    if (auth.user.estado == "vacunado") {
      setState(true);
    }
  }, [loading]);
  if (loading) {
    return <div>Cargando</div>;
  }
  return (
    <>
      <Row type="flex" justify="center">
        <Col xs={24} md={12}>
          <Form
            style={{ width: "100%" }}
            name="usuario"
            labelCol={{
              span: 9,
            }}
            wrapperCol={{
              span: 15,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{
              fecha_nacimiento: userData.fecha_nacimiento
                ? moment(userData.fecha_nacimiento)
                : "",
              estado: userData?.estado ?? "",
              direccion: userData?.direccion ?? "",
              telefono: userData?.telefono ?? "",
              vacuna: userData?.vacuna ?? "",
              dosis: userData?.dosis ?? "",
              fecha_dosis: userData.fecha_dosis
                ? moment(userData.fecha_dosis)
                : "",
            }}
          >
            <Form.Item
              name="fecha_nacimiento"
              label="Fecha de nacimiento"
              rules={[
                {
                  required: true,
                  message: "Fecha requerida",
                },
              ]}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item
              label="telefono"
              name="telefono"
              rules={[
                {
                  required: true,
                  message: "Telefono es requerido",
                  type: "number",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="direccion"
              name="direccion"
              rules={[
                {
                  required: true,
                  message: "direccion es requerido",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Estado"
              name="estado"
              rules={[
                {
                  required: true,
                  message: "campo requerido",
                },
              ]}
            >
              <Select
                // style={{ width: 120 }}
                onChange={handleChange}
              >
                <Option value="vacunado">Vacunado</Option>
                <Option value="no vacunado">No vacunado</Option>
              </Select>
            </Form.Item>
            {state && (
              <>
                <Form.Item
                  label="Vacuna"
                  name="vacuna"
                  rules={[
                    {
                      required: true,
                      message: "campo requerido",
                    },
                  ]}
                >
                  <Select
                  // defaultValue="no vacunado"
                  // style={{ width: 120 }}
                  // onChange={handleChange}
                  >
                    <Option value="Sputnik">Sputnik</Option>
                    <Option value="AstraZeneca">AstraZeneca</Option>
                    <Option value="Pfizer">Pfizer</Option>
                    <Option value="Jhonson&Jhonson">Jhonson&Jhonson</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Dosis"
                  name="dosis"
                  rules={[
                    {
                      required: true,
                      message: "Telefono es requerido",
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  label="Fecha"
                  name="fecha_dosis"
                  rules={[
                    {
                      required: true,
                      message: "campo requerido",
                    },
                  ]}
                >
                  <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
              </>
            )}
            <Space align="center">
              <Button htmlType="submit" type="primary">
                Guardar
              </Button>
              <Button onClick={() => history.goBack()}>Cancelar </Button>
            </Space>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ActualizarDatos;
