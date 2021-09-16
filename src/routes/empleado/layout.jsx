import { useContext } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
const { Header, Content } = Layout;

export const AdminLayout = ({ children }) => {
  const { logout } = useContext(AuthContext);
  return (
    <Layout className="windows-heigth ">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key={"1"}>
            <Link to="/route">Estado</Link>
          </Menu.Item>
          <Menu.Item key={"2"}></Menu.Item>
          <Menu.Item onClick={logout} key={"3"}>
            cerrar sesion
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
        <div
          className="site-layout-background layout-content"
          style={{ padding: 24, minHeight: 360 }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};
