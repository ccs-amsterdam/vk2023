import { useFields } from "@/amcat/api/fields";
import { QueryFormProps } from "./QueryForm";
import AddFilterButton, { fieldOptions } from "./AddFilterButton";
import { queriesFromString } from "./libQuery";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronUp, PlusSquare } from "lucide-react";

export default function MultilineQueryForm({
  children,
  user,
  index,
  q,
  setQ,
  value,
  onSubmit,
  switchAdvanced,
}: QueryFormProps) {
  const { fields } = useFields(user, index);

  if (!index || !fields) return null;

  function handleKeyDown(event: any) {
    if (event.key === "Enter" && event.ctrlKey) {
      onSubmit({ ...value, queries: queriesFromString(q) });
    }
  }

  function submitForm(e: any) {
    e.preventDefault();
    onSubmit({ ...value, queries: queriesFromString(q) });
  }

  const options = fieldOptions(fields, value);

  return (
    <div className="prose max-w-none grid grid-cols-1 md:grid-cols-[1fr,300px] gap-3 lg:gap-6">
      <form className="flex flex-col flex-auto w-full p-1">
        {/*       <form className="flex-auto w-full p-1">
         */}
        <div className="flex items-center gap-2 h-10">
          <div className="flex items-center">
            <b>Query</b>
            <ChevronUp
              onClick={switchAdvanced}
              className="p-1 mb-1  w-8 h-8 cursor-pointer"
            />
          </div>
        </div>
        <Textarea
          className="flex-auto min-h-[120px]"
          placeholder={`Enter multiple (labeled) queries:\n\nLabel1 = query1\nLabel2 = query2\netc.`}
          onChange={(e) => {
            setQ(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          value={q?.replaceAll("; ", "\n").replace(";", "\n") || ""}
        />
        <Button
          className="bg-gray-200 border-2 w-full  h-8 mt-1"
          onClick={submitForm}
        >
          Submit Query <i className="pl-2">(ctrl+Enter)</i>
        </Button>
      </form>

      <div className="flex  flex-col flex-auto w-full p-1">
        <div className="flex items-center gap-2 h-10">
          <b>Filters</b>
          <AddFilterButton options={options} value={value} onSubmit={onSubmit}>
            <PlusSquare
              className={
                options.length === 0
                  ? "text-gray-400 cursor-default"
                  : "cursor-pointer"
              }
            />
          </AddFilterButton>
        </div>

        <div className="Filters flex-auto">{children}</div>
      </div>
    </div>
  );
}
