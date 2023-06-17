import Stripe from "stripe";

export const stripe = new Stripe(process.env.SECRET_KEY_STRIPE as string, {
  apiVersion: "2022-11-15",
  appInfo: {
    name: "Shop",
  },
});
