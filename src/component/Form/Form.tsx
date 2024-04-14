import React, { useState } from "react";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import Box from '@mui/material/Box';
import { validateCost, validateNumber } from "./utils/validation";
import { formatValue } from "./utils/formatValue";



export type FormValues = {
  cartValue: number;
  deliveryDistance: number;
  items: number;
  orderTime: Dayjs;
};

type FormProps = {
  onSubmit: (formValue: FormValues) => void;
};

export const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [cartValue, setCartValue] = useState<number | undefined>();
  const [deliveryDistance, setDeliveryDistance] = useState<
    number | undefined
  >();
  const [items, setItems] = useState<number | undefined>();
  const [orderTime, setOrderTime] = useState<Dayjs>(dayjs());

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    let errors: Record<string, string> = {};

    const costError = validateCost(cartValue);
    const distanceError = validateNumber(deliveryDistance);
    const itemsError = validateNumber(items);

    if (costError) {
      errors["cartValue"] = costError;
    }
    if (distanceError) {
      errors["deliveryDistance"] = distanceError;
    }
    if (itemsError) {
      errors["items"] = itemsError;
    }

    return errors;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const errors = validateForm();

    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    if (!cartValue || !deliveryDistance || !items) {
      return;
    }

    onSubmit({ cartValue, deliveryDistance, items, orderTime });
  };

  return (
    <Box
    component="form" onSubmit={handleSubmit} sx={{
      display: "flex",
      flexDirection: "column",
      gap: "30px"
    }}
    >
      <TextField
        label="Cart Value"
        inputProps={{
          "data-test-id": "cartValue",
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">€</InputAdornment>,
        }}
        value={cartValue ?? ""}
        type="number"
        error={"cartValue" in errors}
        helperText={"cartValue" in errors ? errors["cartValue"] : ""}
        onChange={(event) => setCartValue(formatValue(event.target.value))}
      />
      <TextField
        label="Delivery Distance"
        inputProps={{
          "data-test-id": "deliveryDistance",
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">m</InputAdornment>,
        }}
        value={deliveryDistance ?? ""}
        type="number"
        error={"deliveryDistance" in errors}
        helperText={
          "deliveryDistance" in errors ? errors["deliveryDistance"] : ""
        }
        onChange={(event) =>
          setDeliveryDistance(formatValue(event.target.value))
        }
      />
      <TextField
        label="Amount of Items"
        inputProps={{
          "data-test-id": "items",
        }}
        value={items ?? ""}
        type="number"
        error={"items" in errors}
        helperText={"items" in errors ? errors["items"] : ""}
        onChange={(event) => setItems(formatValue(event.target.value))}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Time"
          slotProps={{
            textField: {
              inputProps: {
                "data-test-id": "time",
              },
            },
          }}
          value={dayjs(orderTime)}
          onChange={(newValue) => {
            if (newValue !== null) {
              setOrderTime(newValue);
            }
          }}
        />
      </LocalizationProvider>

      <Button variant="contained" type="submit" size="large">
        Calculate delivery fee
      </Button>
    </Box>
  );
};
