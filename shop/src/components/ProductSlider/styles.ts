import { styled } from "../../styles";

export const Container = styled("main", {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  maxWidth: "calc(100vw - ((100vw - 1180px) / 2))",
  marginLeft: "auto",
  minHeight: 656,

  alignItems: "flex-start",
  overflow: "hidden",
  position: "relative",
  userSelect: "none",
  touchAction: "none",
  "-webkit-touch-callout": "none",
  "-webkit-tap-highlight-color": "transparent",

  ".keen-slider__slide": {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    minHeight: "100%",
  },

  "&[data-keen-slider-reverse]": {
    flexDirection: "row-reverse",
  },

  "&[data-keen-slider-v]": {
    flexWrap: "wrap",
  },
});

export const Product = styled("div", {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },

  footer: {
    position: "absolute",
    bottom: "0.25rem",
    left: "0.25rem",
    right: "0.25rem",
    padding: "2rem",

    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, .6)",

    transform: "translateY(110%)",
    opacity: 0,
    transition: "all .2s ease-in-out",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  "footer > strong": {
    fontSize: "$lg",
    color: "$gray100",
  },

  "footer > span": {
    fontSize: "$xl",
    fontWeight: "bold",
    color: "$green300",
  },

  "&:hover": {
    footer: {
      transform: "translateY(0%)",
      opacity: 1,
    },
  },
});
