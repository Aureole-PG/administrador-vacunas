import { useState, useContext, useEffect } from "react";
import { Col, Row, Descriptions, Button, Space } from "antd";
import { findUser } from "../../store/users";
import { AuthContext } from "../../auth/AuthContext";
const EmpleadoDashboard = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    const result = findUser(auth.cedula);
    setUserData(result);
    setLoading(false);
  }, [loading]);
  if (loading) {
    return <div>cargando</div>;
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
                {userData.dosis.map((e, i) => (
                  <Descriptions.Item key={i} label="Dosis">
                    <p>Dosis: {e.num}</p>
                    <p>Fecha: {e.fecha}</p>
                  </Descriptions.Item>
                ))}
              </>
            )}
          </Descriptions>
          <Space></Space>
        </Col>
      </Row>
    </>
  );
};

export default EmpleadoDashboard;
