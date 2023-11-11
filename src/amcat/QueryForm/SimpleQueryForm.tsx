import { useEffect, useState } from "react";
import { useFields, getField } from "@/amcat/api";
import FilterPicker from "./FilterPicker";
import { queryFromString, queryToString } from "./libQuery";
import { QueryFormProps } from "./QueryForm";
import AddFilterButton, { fieldOptions } from "./AddFilterButton";
import { Input } from "@/components/ui/input";
import { ChevronsUpDown } from "lucide-react";

export default function SimpleQueryForm({
  user,
  index,
  value,
  onSubmit,
  switchAdvanced,
}: QueryFormProps) {
  const fields = useFields(user, index);
  const [q, setQ] = useState("");
  useEffect(() => {
    if (!value?.queries || Object.keys(value.queries).length === 0) setQ("");
    else setQ(queryToString(value.queries, "; "));
  }, [value?.queries]);

  if (!index || !fields) return null;

  function deleteFilter(name: string) {
    const f = { ...value.filters };
    delete f[name];
    onSubmit({ ...value, filters: f });
  }
  function addFilter(name: string) {
    const filters = value?.filters || {};
    onSubmit({ ...value, filters: { ...filters, [name]: {} } });
  }

  function handleKeydown(e: any) {
    if (e.key === "Enter") onSubmit({ ...value, queries: queryFromString(q) });
  }
  return (
    <div className="flex flex-wrap items-center gap-1 p-1">
      <ChevronsUpDown
        onClick={switchAdvanced}
        className="p-1 w-8 h-8 cursor-pointer"
      />
      <Input
        className="min-w-[50%] flex-auto w-auto"
        placeholder="search"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
        }}
        onKeyDown={handleKeydown}
      />
      <AddFilterButton
        options={fieldOptions(fields, value)}
        onClick={addFilter}
      />

      {Object.keys(value?.filters || {}).map((f, i) => (
        <FilterPicker
          key={i}
          user={user}
          index={index}
          field={getField(fields, f)}
          value={value?.filters?.[f]}
          onChange={(newval) =>
            onSubmit({ ...value, filters: { ...value?.filters, [f]: newval } })
          }
          onDelete={() => deleteFilter(f)}
        />
      ))}
    </div>
  );
}
