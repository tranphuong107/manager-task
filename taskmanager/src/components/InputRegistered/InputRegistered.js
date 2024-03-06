import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

const InputRegistered = ({ name, ...rest }) => {
  const methods = useFormContext();
  const {
    register,
    formState: { errors },
  } = methods;
  
  return (
    <TextField
      {...rest}
      {...register(name)}
      sx={{ width: 400, margin: "15px" }}
      error={Boolean(errors[name])}
      helperText={errors[name]?.message}
    />
  );
};

export default InputRegistered;
