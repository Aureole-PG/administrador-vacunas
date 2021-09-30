import { useState, useContext, useEffect } from "react";
import { Col, Row, Descriptions, Button, Space } from "antd";
import { AuthContext } from "../../auth/AuthContext";
import { useHistory } from "react-router";
import moment from "moment";
const EmpleadoDashboard = () => {
  const [userData, setUserData] = useState({});
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    setUserData(auth.user);
    setLoading(false);
    return () => {
      setLoading(false);
    };
  }, [loading]);
  if (loading) {
    return <div>Cargando</div>;
  }
  return (
    <>
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
                ? moment(userData.fecha_nacimiento).format("DD-MM-yyyy")
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
                    Fecha: {moment(userData.fecha_dosis).format("DD-MM-yyyy")}
                  </p>
                </Descriptions.Item>
              </>
            )}
          </Descriptions>
          <Space></Space>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col>
          <Button
            type="primary"
            onClick={() => history.push("/route/update")}
            // danger
            size={"small"}
          >
            Actualizar datos
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default EmpleadoDashboard;
