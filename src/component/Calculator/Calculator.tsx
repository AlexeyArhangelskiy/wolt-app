import { useState } from "react";
import Typography from "@mui/material/Typography";
import { getDeliveryPrice } from "./utils/getDeliveryPrice";
import { Form, FormValues } from "../Form";

export const Calculator = () => {
  const [deliveryPrice, setDeliveryPrice] = useState<number | null>(null);

  const handleSubmit = (formValues: FormValues) => {
    const { cartValue, deliveryDistance, items, orderTime } = formValues;

    const result = getDeliveryPrice(
      cartValue,
      deliveryDistance,
      items,
      orderTime,
    );

    setDeliveryPrice(result);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} />
      {deliveryPrice !== null && (
        <Typography variant="h4" sx={{ mt: "30px", fontWeight: 700 }}>
          Delivery price: <span data-test-id="fee">{deliveryPrice}</span> €
        </Typography>
      )}
    </>
  );
};
