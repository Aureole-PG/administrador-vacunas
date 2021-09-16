import { useState } from "react";
import { UserForm } from "./Form";
import { Col, Row, Descriptions, Button } from "antd";
import { AddNewUser } from "../../../store/users";
import { createUserData } from "../../../utils/generator";
import { useHistory } from "react-router";
const Create = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  const submit = (values) => {
    setLoading(true);
    const { nombre, apellido, cedula } = values;
    let data = createUserData(nombre, apellido, cedula);
    data = { ...values, ...data };
    const state = AddNewUser(data);
    if (state) {
      setUserData(data);
      setSuccess(true);
      setLoading(false);
    } else {
      setError(true);
      setLoading(false);
    }
  };
  return (
    <>
      <Row type="flex" justify="center">
        <Col>
          <h3>{success ? "Usuario Creado" : "Crear ususario"}</h3>
        </Col>
      </Row>
      {success ? (
        <Row type="flex" justify="center">
          <Col xs={24}>
            <Descriptions bordered>
              <Descriptions.Item label="Nombre">
                {userData.nombre}
              </Descriptions.Item>
              <Descriptions.Item label="Apellido">
                {userData.apellido}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {userData.email}
              </Descriptions.Item>
              <Descriptions.Item label="Cedula">
                {userData.cedula}
              </Descriptions.Item>
              <Descriptions.Item label="Usuario">
                {userData.usuario}
              </Descriptions.Item>
              <Descriptions.Item label="Contraseña">
                {userData.contraseña}
              </Descriptions.Item>
            </Descriptions>
            <Button
              onClick={() => history.push("/route")}
              type="primary"
              shape="round"
              size={"small"}
            >
              Continuar
            </Button>
          </Col>
        </Row>
      ) : (
        <Row type="flex" justify="center">
          <Col md={12} xs={24}>
            <UserForm loading={loading} submitFunc={submit} />
          </Col>
        </Row>
      )}
    </>
  );
};
export default Create;
