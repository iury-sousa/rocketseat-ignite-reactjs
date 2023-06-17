import { useContextSelector } from "use-context-selector";
import { TransactionContext } from "../contexts/TransactionContext";
import { useMemo } from "react";

export function useSummary() {
  const transactions = useContextSelector(
    TransactionContext,
    (context) => context.transactions
  );

  const summary = useMemo(() => {
    return transactions.reduce(
      (previousValue, transaction) => {
        if (transaction.type === "income") {
          previousValue.income += transaction.price;
          previousValue.total += transaction.price;
        } else {
          previousValue.outcome += transaction.price;
          previousValue.total -= transaction.price;
        }

        return previousValue;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      }
    );
  }, [transactions]);

  return summary;
}
