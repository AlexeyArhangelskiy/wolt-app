import { Dayjs } from "dayjs";

const MAX_AMOUNT = 200;
const BASE_DELIVERY_FEE = 200;
const ADD_DELIVERY_FEE = 100;
const MIN_SURCHARGE_CART_VALUE = 1000;
const MAX_DELIVERY_FEE = 15;
const EXTRA_BULK = 120;
const ADD_SURCHARGE = 50;
const FRIDAY_MULTIPLIER = 1.2;

export const getDeliveryPrice = (
  cost: number,
  distance: number,
  item: number,
  time: Dayjs,
) => {
  const costInCent = cost * 100;

  if (cost >= MAX_AMOUNT) return 0;

  // amount cost for distance

  let distFee = BASE_DELIVERY_FEE;
  if (distance > 1000) {
    let tmp = distance - 1000;
    distFee +=
      Math.trunc(tmp / 500) * ADD_DELIVERY_FEE +
      (tmp % 500 > 0 ? ADD_DELIVERY_FEE : 0);
  }

  // check cartValue

  let costAdd = costInCent < MIN_SURCHARGE_CART_VALUE ? 1000 - costInCent : 0;

  // amount items

  let itemsAmount = 0;
  if (item >= 5) itemsAmount = (item - 4) * ADD_SURCHARGE;
  if (item > 12) itemsAmount += EXTRA_BULK;

  // check time
  const dayOfWeek = time.day();
  const hour = time.hour();

  let k = 1;
  if (dayOfWeek === 5 && hour >= 15 && hour <= 19) k = FRIDAY_MULTIPLIER;

  const finalPrice = Math.round((distFee + costAdd + itemsAmount) * k);

  return finalPrice / 100 > MAX_DELIVERY_FEE
    ? MAX_DELIVERY_FEE
    : finalPrice / 100;
};
