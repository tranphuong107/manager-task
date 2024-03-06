import { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";

import AddTask from "../AddTask/AddTask";
import UpdateTask from "../UpdateTask/UpdateTask";

const ListTask = () => {
  const taskApi = `${process.env.REACT_APP_API_URL}/task`;

  const [tasks, setTasks] = useState([]);
  const [idTaskUpdate, setIdTaskUpdate] = useState(null);
  const [isClickAdd, setIsClickAdd] = useState(false);
  const [isClickUpdate, setIsClickUpdate] = useState(false);
  const [isClickDelete, setIsClickDelete] = useState(false);
  const [isAddSuccess, setIsAddSuccess] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [idTaskDelete, setIdTaskDelete] = useState(null);

  const fetchTaskData = async () => {
    let response = await fetch(taskApi);
    let data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchTaskData().then((data) => setTasks(data));
  }, []);

  const columns = [
    { field: "Title", headerName: "Title", width: 200 },
    { field: "Category", headerName: "Category", width: 250 },
    { field: "Status", headerName: "Status", width: 210 },
    { field: "CreatedAt", headerName: "Created At", width: 150, type: "date" },
    {
      field: "CompletedAt",
      headerName: "Completed At",
      width: 150,
      type: "date",
    },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ModeEditOutlineRoundedIcon />}
          label="update"
          sx={{ color: "#37B6D8", marginLeft: 3, cursor: "pointer" }}
          onClick={() => handleClickUpdate(params.row.idTask)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          sx={{ color: "#e66771", marginLeft: 3, cursor: "pointer" }}
          onClick={() => getIdTaskDelete(params.row.idTask)}
        />,
      ],
    },
  ];

  const rows = tasks
    .sort((a, b) => (parseInt(a.id) < parseInt(b.id) ? 1 : -1))
    .map((task, id) => ({
      Title: task.title,
      Category: task.categories.map((Category) => " " + Category.name),
      Status: task.status,
      CompletedAt: task["completed At"],
      CreatedAt: task["created At"],
      idTask: task.id,
      id: id,
    }));

  const getIdTaskDelete = (id) => {
    setIdTaskDelete(id);
    setIsClickDelete(true);
  };
  const handleDeleteRow = () => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(taskApi + "/" + idTaskDelete, options).then(() => {
      setIsDeleteSuccess(true);
      fetchTaskData().then((data) => setTasks(data));
    });
  };

  const handleClickUpdate = (id) => {
    setIdTaskUpdate(id);
    setIsClickUpdate(!isClickUpdate);
  };

  return (
    <Box
      sx={{
        width: "85%",
        minHeight: "100vh",
        position: "absolute",
        left: "15%",
        top: 0,
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginTop: 5,
          color: "#333",
          textAlign: "center",
          fontWeight: 700,
        }}
      >
        List task
      </Typography>
      <Box sx={{ position: "absolute", top: 160, right: 80 }}>
        <Button
          variant="contained"
          onClick={() => setIsClickAdd(!isClickAdd)}
          sx={{
            backgroundColor: "#60D300",
            marginLeft: "30px",
            "&:hover": { backgroundColor: "#60D300" },
          }}
        >
          Add
        </Button>
      </Box>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{
            width: "90%",
            margin: "0 auto",
            marginTop: "150px",
          }}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
      <UpdateTask
        isClickUpdate={isClickUpdate}
        setIsClickUpdate={setIsClickUpdate}
        idTaskUpdate={idTaskUpdate}
        tasks={tasks}
        setIsUpdateSuccess={setIsUpdateSuccess}
        fetchTaskData={fetchTaskData}
        setTasks={setTasks}
      />
      <AddTask
        isClickAdd={isClickAdd}
        setIsClickAdd={setIsClickAdd}
        tasks={tasks}
        setIsAddSuccess={setIsAddSuccess}
        fetchTaskData={fetchTaskData}
        setTasks={setTasks}
      />
      <Snackbar
        open={isAddSuccess}
        autoHideDuration={4000}
        onClose={() => setIsAddSuccess(!isAddSuccess)}
      >
        <Alert
          onClose={() => setIsAddSuccess(!isAddSuccess)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Task added successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isUpdateSuccess}
        autoHideDuration={4000}
        onClose={() => setIsUpdateSuccess(!isUpdateSuccess)}
      >
        <Alert
          onClose={() => setIsUpdateSuccess(!isUpdateSuccess)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Task updated successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isDeleteSuccess}
        autoHideDuration={4000}
        onClose={() => setIsDeleteSuccess(!isDeleteSuccess)}
      >
        <Alert
          onClose={() => setIsDeleteSuccess(!isDeleteSuccess)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Task deleted successfully!
        </Alert>
      </Snackbar>
      <Dialog
        open={isClickDelete}
        onClose={() => setIsClickDelete(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm delete task"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsClickDelete(false)}>No</Button>
          <Button
            onClick={() => {
              handleDeleteRow();
              setIsClickDelete(false);
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListTask;
