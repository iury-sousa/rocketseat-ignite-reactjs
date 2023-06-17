import { styled } from "@/styles";

export const Button = styled("button", {
  marginTop: "auto",
  backgroundColor: "$green500",
  border: 0,
  color: "$white",
  borderRadius: 8,
  padding: "1.25rem",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "$md",
  transition: "all .2s",

  "&:hover": {
    backgroundColor: "$green300",
  },
});
