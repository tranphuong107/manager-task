import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button
} from "@mui/material";

import InputRegistered from "../InputRegistered/InputRegistered";
import AutocompleteRegistered from "../AutocompleteRegistered/AutocompleteRegistered";
import {CATEGORIES, STATUSES, taskApi} from "./../constant.js"

const UpdateTask = ({
  isClickUpdate,
  setIsClickUpdate,
  idTaskUpdate,
  tasks,
  setIsUpdateSuccess,
  fetchTaskData,
  setTasks,
}) => {
  let TaskUpdate = tasks.find((task) => task.id === idTaskUpdate);

  let defaultValues = {
    title: TaskUpdate?.title,
    status: TaskUpdate?.status,
    category: TaskUpdate?.categories.map((category) => category.name),
  };

  useEffect(() => {
    reset(defaultValues);
  }, [isClickUpdate]);

  const schema = yup.object().shape({
    title: yup.string().required("Title is required."),
    status: yup.string().required("Status is required."),
    category: yup.array().min(1, "Category must not be empty"),
  });

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "all",
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid }
  } = methods;

  const handleUpdate = (dataTask) => {
    const categories = dataTask.category.map((category, id) => ({
      id,
      name: category,
    }));

    const data = {
      title: dataTask.title,
      status: dataTask.status,
      categories: categories,
    };

    if (dataTask.title && dataTask.category && dataTask.status) {
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      fetch(taskApi + "/" + idTaskUpdate, options).then(() => {
        setIsClickUpdate(!isClickUpdate);
        setIsUpdateSuccess(true);
        fetchTaskData().then((data) => setTasks(data));
      });
    }
  };

  return (
    <Dialog
      open={isClickUpdate}
      onClose={() => setIsClickUpdate(!isClickUpdate)}
    >
      <DialogTitle>UPDATE</DialogTitle>
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
          <FormControl sx={{ marginLeft: "18px" }}>
            <FormLabel>Status</FormLabel>
            <RadioGroup row name="row-radio-buttons-group">
              {STATUSES.map((status, id) => (
                <FormControlLabel
                  value={status}
                  {...register("status")}
                  control={<Radio />}
                  label={status}
                  key={id}
                  checked={watch("status") === status ? true : false}
                  error={Boolean(errors.status)}
                  helperText={errors.status?.message}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#60D300",
            "&:hover": { backgroundColor: "#60D300" },
          }}
          onClick={handleSubmit(handleUpdate)}
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
          onClick={() => setIsClickUpdate(!isClickUpdate)}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateTask;
