import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TaskPage from "./pages/TaskPage";
import "./App.scss";

const App = () => {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return (
      <switch>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </switch>
    );
  }
  return (
    <div>
      <TaskPage />
    </div>
  );
};

export default App;
