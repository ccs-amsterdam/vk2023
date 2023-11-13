import { useFields } from "@/amcat/api";
import { queriesFromString } from "./libQuery";
import { QueryFormProps } from "./QueryForm";
import AddFilterButton, { fieldOptions } from "./AddFilterButton";
import { Input } from "@/components/ui/input";
import { ChevronsUpDown, Filter } from "lucide-react";

export default function SimpleQueryForm({
  children,
  user,
  index,
  value,
  q,
  setQ,
  onSubmit,
  switchAdvanced,
}: QueryFormProps) {
  const { fields } = useFields(user, index);

  if (!index || !fields) return null;

  function handleKeydown(e: any) {
    if (e.key === "Enter")
      onSubmit({ ...value, queries: queriesFromString(q) });
  }
  const options = fieldOptions(fields, value);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1 p-1">
        <Input
          className="min-w-[50%] flex-auto w-auto"
          placeholder="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
          }}
          onKeyDown={handleKeydown}
        />
        <ChevronsUpDown
          onClick={switchAdvanced}
          className="p-1 w-8 h-8 cursor-pointer"
        />
        <AddFilterButton options={options} value={value} onSubmit={onSubmit}>
          <Filter
            className={
              options.length === 0 ? "text-gray-400" : "cursor-pointer"
            }
          />
        </AddFilterButton>
      </div>
      <div className="Filters flex justify-start flex-wrap items-center gap-1 p-1">
        {children}
      </div>
    </div>
  );
}
