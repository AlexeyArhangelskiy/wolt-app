import dayjs from "dayjs";
import { getDeliveryPrice } from "./getDeliveryPrice";

describe("calculateDeliveryFee", () => {
  it("calculates delivery fee with small order surcharge", () => {
    const orderTime = dayjs("2024-01-25T16:00:00"); // Thursday, 4 PM
    const result = getDeliveryPrice(8.9, 1000, 4, orderTime);
    expect(result).toBe(3.1);
  });

  it("calculates delivery fee with additional distance charge", () => {
    const orderTime = dayjs("2024-01-25T16:00:00"); // Thursday, 4 PM
    const result = getDeliveryPrice(15, 1501, 4, orderTime);
    expect(result).toBe(4);
  });

  it("calculates delivery fee with distance less 1000", () => {
    const orderTime = dayjs("2024-01-25T16:00:00"); // Thursday, 4 PM
    const result = getDeliveryPrice(11, 999, 4, orderTime);
    expect(result).toBe(2);
  });

  it("calculates delivery fee with item surcharge", () => {
    const orderTime = dayjs("2024-01-25T16:00:00"); // Thursday, 4 PM
    const result = getDeliveryPrice(50, 1000, 5, orderTime);
    expect(result).toBe(2.5);
  });

  it("calculates delivery fee with bulk item surcharge", () => {
    const orderTime = dayjs("2024-01-25T16:00:00"); // Thursday, 4 PM
    const result = getDeliveryPrice(100, 1000, 13, orderTime);
    expect(result).toBe(7.7);
  });

  it("caps delivery fee at maximum limit", () => {
    const orderTime = dayjs("2024-01-25T16:00:00"); // Thursday, 4 PM
    const result = getDeliveryPrice(200, 2000, 20, orderTime);
    expect(result).toBe(0);
  });

  it("provides free delivery for high cart value", () => {
    const orderTime = dayjs("2024-01-25T16:00:00"); // Thursday, 4 PM
    const result = getDeliveryPrice(300, 1000, 5, orderTime);
    expect(result).toBe(0);
  });

  it("applies Friday rush multiplier during rush hours", () => {
    const orderTime = dayjs("2024-01-26T17:00:00"); // Friday, 5 PM
    const result = getDeliveryPrice(20, 1000, 3, orderTime);
    expect(result).toBe(2.4);
  });

  it("caps Friday rush delivery fee at maximum limit", () => {
    const orderTime = dayjs("2024-01-26T18:00:00"); // Friday, 6 PM
    const result = getDeliveryPrice(50, 2000, 21, orderTime);
    expect(result).toBe(15);
  });
});
