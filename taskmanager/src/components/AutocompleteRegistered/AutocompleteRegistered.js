import { Autocomplete, TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const AutocompleteRegistered = ({ name, options, label, ...rest }) => {
  const methods = useFormContext();
  const {
    control,
    setValue,
    formState: { errors },
  } = methods;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...rest}
          {...field}
          options={options}
          onChange={(event, selected) => setValue(name, selected)}
          sx={{ width: 400, margin: "15px" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={Boolean(errors[name])}
              helperText={errors[name]?.message}
            />
          )}
        />
      )}
    />
  );
};

export default AutocompleteRegistered;
