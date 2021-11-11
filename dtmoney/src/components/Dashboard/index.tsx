import { TransactionsTable } from "../TreansactionsTable";
import { Summary } from "./../Summary";
import { Container } from "./styled";

export function Dashboard() {
  return (
    <Container>
      <Summary />
      <TransactionsTable />
    </Container>
  );
}
