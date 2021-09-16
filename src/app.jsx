import { MainRoute } from "./route";
import "antd/dist/antd.css";
import "./styles/custom.css";
import { AuthProvider } from "./auth/AuthContext";
const App = () => {
  return (
    <AuthProvider>
      <MainRoute />
    </AuthProvider>
  );
};

export default App;
