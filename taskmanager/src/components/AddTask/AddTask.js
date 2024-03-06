import { useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import {CATEGORIES, STATUSES, taskApi} from "./../constant.js"
import InputRegistered from "../InputRegistered/InputRegistered";
import AutocompleteRegistered from "../AutocompleteRegistered/AutocompleteRegistered";



const AddTask = ({
  isClickAdd,
  setIsClickAdd,
  tasks,
  setIsAddSuccess,
  fetchTaskData,
  setTasks,
}) => {
  const defaultValues = {
    title: "",
    status: "",
    category: [],
    completedAt: new Date(),
  };

  useEffect(() => {
    reset(defaultValues);
  }, [isClickAdd]);

  const schema = yup.object().shape({
    title: yup.string().required("Title is required."),
    status: yup.string().required("Status is required."),
    category: yup.array().min(1, "Category must not be empty"),
    completedAt: yup
      .date()
      .min(dayjs().startOf("day").toDate(), "Day is invalid")
      .required("Completed At is required."),
  });

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
    mode: "all",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = methods;

  const onClickAdd = (taskAdd) => {
    let dayCompleteAt = dayjs(taskAdd.completedAt).format("DD/MM/YYYY");
    let dayCreatedAt = dayjs().format("DD/MM/YYYY");
    let categories = taskAdd.category.map((item, id) => ({ id, name: item }));
    let maxIdTask = Math.max(...tasks.map((task) => task.id));
    let idTaskAdd = Number(maxIdTask) + 1;

    const data = {
      author: {
        id: "123rty",
        username: "phuong",
      },
      title: taskAdd.title,
      id: String(idTaskAdd),
      status: taskAdd.status,
      "created At": dayCreatedAt,
      "completed At": dayCompleteAt,
      categories: categories,
    };

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(taskApi, option).then(() => {
      setIsClickAdd(false);
      setIsAddSuccess(true);
      fetchTaskData().then((data) => setTasks(data));
    });
  };

  return (
    <Dialog open={isClickAdd} onClose={() => setIsClickAdd(!isClickAdd)}>
      <DialogTitle>ADD</DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <InputRegistered name="title" variant="outlined" label="Title" />
          <AutocompleteRegistered
            name="category"
            label="Category"
            multiple
            id="input-category"
            options={CATEGORIES}
            getOptionLabel={(option) => option}
          />
          <AutocompleteRegistered
            name="status"
            label="Status"
            id="input-status"
            options={STATUSES}
          />
          <Controller
            name="completedAt"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  {...field}
                  label="Completed At"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{ width: 400, margin: "15px" }}
                      error={Boolean(errors.completedAt)}
                      helperText={errors.completedAt?.message}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />
        </FormProvider>
        <DialogActions>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#60D300",
              "&:hover": { backgroundColor: "#60D300" },
            }}
            type="submit"
            onClick={handleSubmit(onClickAdd)}
            disabled={!isValid}
          >
            Save
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#333",
              "&:hover": { backgroundColor: "#333" },
            }}
            onClick={() => setIsClickAdd(false)}
          >
            Close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
