import { stripe } from "@/lib/stripe";
import { SuccessContainer, ImageContainer } from "@/styles/pages/success";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export default async function Success({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  if (!searchParams.session_id) {
    redirect("/");
  }

  const sessionId = String(searchParams.session_id);
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customer = session.customer_details?.name;
  const product = session.line_items?.data[0].price?.product as Stripe.Product;

  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>
      <ImageContainer>
        <Image src={product.images[0]} alt="" width={120} height={110} />
      </ImageContainer>
      <p>
        Uhuul <strong>{customer}</strong>, sua <strong>{product.name}</strong>{" "}
        the Limits já está a caminho da sua casa.{" "}
      </p>
      <Link href="/">Voltar ao catálago</Link>
    </SuccessContainer>
  );
}
