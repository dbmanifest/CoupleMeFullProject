import { Client } from "@coingate/coingate-sdk";
import { auth } from "@clerk/nextjs/server";
const client = new Client("Xyt5js1dyq6nMz46zeZXdoUCgSmtKhsUz_dkw9Wa", true);

export default async function createOrder(
  price_amount: number,
  userId: string
) {
  // template userId into 'https://couple.me/payments?user=
  let callback_url = `https://couple.me/payments?user=${userId}`;
  const data = {
    price_amount: price_amount,
    price_currency: "USD",
    receive_currency: "USD",
    callback_url: callback_url,
  };
  try {
    const order = await client.order.createOrder(data);
  } catch (error) {
    // Oops... Something went wrong...
    console.error(error);
  }
}
