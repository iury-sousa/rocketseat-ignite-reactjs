import { getCssText } from "@/styles";
import { globalStyled } from "@/styles/global";
import { Roboto } from "next/font/google";
import logoImg from "../assets/logo.svg";
import Image from "next/image";
import { Container, Header } from "@/styles/pages/app";
import { useServerInsertedHTML } from "next/navigation";
import { ReactNode } from "react";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "700"],
});

export const metadata = {
  title: "Shop",
  description: "",
};

globalStyled();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </head>
      <body className={roboto.className}>
        <Container>
          <Header>
            <Image src={logoImg} alt="" />
          </Header>
          {children}
        </Container>
      </body>
    </html>
  );
}
