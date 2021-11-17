import { fauna } from "../../../services/fauna";
import { query } from "faunadb";
import { stripe } from "../../../services/stripe";

const { Get, Match, Index, Select, Create, Collection } = query;
export async function saveSubscription(
  subscriptionId: string,
  customerId: string
) {
  const userRef = await fauna.query(
    Select("ref", Get(Match(Index("user_by_stripe_customer_id"), customerId)))
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    proce_id: subscription.items.data[0].price.id,
  };

  await fauna.query(
    Create(Collection("subscriptions"), { data: subscriptionData })
  );
}
