import { useEffect, useState } from "react";
import { useFields, getField } from "@/amcat/api";
import FilterPicker from "./FilterPicker";
import { QueryFormProps } from "./QueryForm";
import AddFilterButton, { fieldOptions } from "./AddFilterButton";
import { queryFromString, queryToString } from "./libQuery";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { WithTooltip } from "@/components/WithTooltip";
import { X } from "lucide-react";

export default function MultilineQueryForm({
  user,
  index,
  value,
  onSubmit,
}: QueryFormProps) {
  const fields = useFields(user, index);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (value?.queries) setQ(queryToString(value.queries));
    else setQ("");
  }, [value?.queries]);

  if (!index || !fields) return null;

  function addFilter(name: string) {
    const filters = value?.filters || {};
    onSubmit({ ...value, filters: { ...filters, [name]: {} } });
  }

  function deleteFilter(name: string) {
    const f = { ...value.filters };
    delete f[name];
    onSubmit({ ...value, filters: f });
  }

  function handleKeyDown(event: any) {
    if (event.key === "Enter" && event.ctrlKey) {
      onSubmit({ ...value, queries: queryFromString(q) });
    }
  }

  function submitForm(e: any) {
    e.preventDefault();
    onSubmit({ ...value, queries: queryFromString(q) });
  }

  const hint = (
    <p>
      Use control+Enter to submit; label queries with{" "}
      <span className="font-bold text-primary">label = query</span>
    </p>
  );

  return (
    <div className="flex flex-col">
      <div className="flex-auto prose max-w-none grid grid-cols-1 md:grid-cols-[1fr,300px] gap-3 lg:gap-6">
        <form className="flex-auto w-full">
          <div className="flex items-center gap-2">
            <b>Query</b>

            <WithTooltip tooltip={hint} />
          </div>
          <Textarea
            className=""
            rows={5}
            placeholder={`Enter multiple (labeled) queries:\n\nLabel1 = query1\nLabel2 = query2\netc.`}
            onChange={(e) => {
              setQ(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            value={q || ""}
          />
          <Button
            className="bg-gray-200 border-2 w-full  h-8 mt-1"
            onClick={submitForm}
          >
            Submit Query
          </Button>
        </form>

        <div>
          <b>Filters:</b>
          <br />
          <div>
            <div className="filter">
              <div className="filterpicker">
                <AddFilterButton
                  className="w-full"
                  options={fieldOptions(fields, value)}
                  onClick={(field) => {
                    addFilter(field);
                  }}
                />
              </div>
            </div>
            {Object.keys(value?.filters || {}).map((f, i) => (
              <div className="flex" key={i}>
                <div className=" w-full">
                  <FilterPicker
                    className="w-full"
                    key={i}
                    user={user}
                    index={index}
                    field={getField(fields, f)}
                    value={value?.filters?.[f]}
                    onChange={(newval) =>
                      onSubmit({
                        ...value,
                        filters: { ...value?.filters, [f]: newval },
                      })
                    }
                  />
                </div>
                <div className="filterdelete">
                  <Button
                    className="bg-background border-2 px-2"
                    onClick={() => deleteFilter(f)}
                  >
                    <X />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <br />
        </div>
      </div>
    </div>
  );
}
