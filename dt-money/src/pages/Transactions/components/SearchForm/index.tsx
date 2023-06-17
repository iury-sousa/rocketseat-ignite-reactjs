import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { useContextSelector } from "use-context-selector";
import { z } from "zod";
import { TransactionContext } from "../../../../contexts/TransactionContext";
import { SearchFormContainer } from "./styles";
import { memo } from "react";

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

function SearchFormComponent() {
  const fetchTransactions = useContextSelector(
    TransactionContext,
    (context) => context.fetchTransactions
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransaction(data: SearchFormInputs) {
    await fetchTransactions(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} /> Buscar
      </button>
    </SearchFormContainer>
  );
}

export const SearchForm = memo(SearchFormComponent);
