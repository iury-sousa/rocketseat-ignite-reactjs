import { render, screen, waitFor } from "@testing-library/react";
import { Async } from ".";

test("it renders correctly", async () => {
  render(<Async />);

  expect(screen.getByText("Hello world!")).toBeInTheDocument();
  // expect(
  //   await screen.findByText("Button", {}, { timeout: 2000 })
  // ).toBeInTheDocument();

  await waitFor(() => expect(screen.getByText("Button")).toBeInTheDocument(), {
    timeout: 3000,
  });
});
