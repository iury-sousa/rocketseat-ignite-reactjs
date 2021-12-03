import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
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

  /**Quando o elemento não é exibido
  * Exemplo 01
    await waitFor(() => expect(screen.queryByText("Button")).not.toBeInTheDocument(), {
      timeout: 3000,
    });
  * Exemplo 02
    await waitForElementToBeRemoved(screen.queryByText("Button"))
  */
});
