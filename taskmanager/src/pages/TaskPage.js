import { Routes, Route } from "react-router-dom";
import SidebarTask from "../components/SidebarTask/SidebarTask";
import ListTask from "../components/ListTask/ListTask";
import MyAccount from "../components/MyAccount/MyAccount";


import "./style.scss";
function TaskPage() {
  return (
    <div className="task">
      <SidebarTask />
      <Routes>
        <Route path="/" element={<ListTask />}/>
        <Route path="/MyAccount" element={<MyAccount />} />
      </Routes>
    </div>
  );
}

export default TaskPage;
