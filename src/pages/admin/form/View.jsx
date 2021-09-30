import { useState, useEffect } from "react";
import { UserForm } from "./Form";
import { Col, Row, Descriptions, Button, Space } from "antd";
import { useHistory } from "react-router";
import { deleteUser, updateUser } from "../../../store/users";
import moment from "moment";
const Create = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  const submit = (data) => {
    setLoading(true);
    const result = updateUser(data, userData.cedula);
    if (result) {
      setLoading(false);
      setUserData(data);
      setSuccess(true);
      history.push("/route");
    } else {
      setLoading(false);
    }
  };
  const eliminarUsuario = () => {
    deleteUser(userData.cedula);
    history.push("/route");
  };
  useEffect(() => {
    setUserData(history.location.state.record);
  }, []);

  return (
    <>
      <Row type="flex" justify="center">
        <Col>
          <h3>{success ? "Usuario Editado" : "Informacion de ususario"}</h3>
        </Col>
      </Row>
      {!isEdit ? (
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
              <Descriptions.Item label="Telefono">
                {userData.telefono ?? ""}
              </Descriptions.Item>
              <Descriptions.Item label="Direccion">
                {userData.direccion ?? ""}
              </Descriptions.Item>
              <Descriptions.Item label="Fecha de nacimiento">
                {userData.fecha_nacimiento
                  ? moment(userData.fecha_nacimiento).format("DD-mm-yyyy")
                  : ""}
              </Descriptions.Item>
              <Descriptions.Item label="Usuario">
                {userData.usuario}
              </Descriptions.Item>
              <Descriptions.Item label="Contraseña">
                {userData.contraseña}
              </Descriptions.Item>
              <Descriptions.Item label="Estado">
                {userData.estado}
              </Descriptions.Item>

              {userData.estado == "vacunado" && (
                <>
                  <Descriptions.Item label="Vacuna">
                    {userData.vacuna}
                  </Descriptions.Item>
                  <Descriptions.Item label="Dosis">
                    <p>Dosis: {userData.dosis}</p>
                    <p>
                      Fecha: {moment(userData.fecha_dosis).format("DD-mm-yyyy")}
                    </p>
                  </Descriptions.Item>
                </>
              )}
            </Descriptions>
            <Space>
              <Button
                type="primary"
                onClick={() => setIsEdit(true)}
                shape="round"
                size={"small"}
              >
                Editar
              </Button>
              <Button
                type="primary"
                onClick={eliminarUsuario}
                danger
                shape="round"
                size={"small"}
              >
                eliminar
              </Button>
            </Space>
          </Col>
        </Row>
      ) : (
        <>
          <Row type="flex" justify="end">
            <Button
              type="primary"
              onClick={() => setIsEdit(false)}
              shape="round"
              size={"small"}
            >
              {" "}
              Canelar
            </Button>
          </Row>
          <Row type="flex" justify="center">
            <Col md={12} xs={24}>
              <UserForm loading={loading} data={userData} submitFunc={submit} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
export default Create;
