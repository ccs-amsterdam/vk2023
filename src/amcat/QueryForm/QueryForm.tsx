import { useEffect, useRef, useState } from "react";
import {
  AmcatIndexName,
  AmcatQuery,
  AmcatUser,
  AmcatQueryTerm,
} from "@/amcat/interfaces";
import MultilineQueryForm from "./MultilineQueryForm";
import SimpleQueryForm from "./SimpleQueryForm";
import FilterPicker from "./FilterPicker";
import { useFields, getField } from "@/amcat/api/fields";
import { queriesToString } from "./libQuery";

export interface Props {
  user: AmcatUser;
  index: AmcatIndexName;
  value: AmcatQuery;
  onSubmit: (value: AmcatQuery) => void;
}

export interface QueryFormProps extends Props {
  children: React.ReactNode[]; // pass filters as children
  q: string;
  setQ: (q: string) => void;
  switchAdvanced: () => void;
}

export default function QueryForm({ user, index, value, onSubmit }: Props) {
  const [advanced, setAdvanced] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { fields } = useFields(user, index);
  const [q, setQ] = useState<string>(() =>
    queriesToString(value?.queries || [])
  );

  useEffect(() => {
    setQ(queriesToString(value?.queries || []));
  }, [value?.queries]);

  if (!index) return null;

  useEffect(() => {
    function setHeight() {
      if (!containerRef?.current || !formRef?.current) return;
      const newHeight = formRef.current.scrollHeight + "px";
      containerRef.current.style.gridTemplateRows = newHeight;
    }

    setHeight();
    const interval = setInterval(setHeight, 1000);
    return () => clearInterval(interval);
  }, [value, advanced, containerRef, formRef]);

  const switchAdvanced = () => setAdvanced(!advanced);

  function deleteFilter(name: string) {
    const f = { ...value.filters };
    delete f[name];
    onSubmit({ ...value, filters: f });
  }

  const QForm = advanced ? MultilineQueryForm : SimpleQueryForm;

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={containerRef}
        className={`grid grid-rows-1 transition-all overflow-hidden`}
      >
        <div>
          <div ref={formRef}>
            <QForm
              user={user}
              index={index}
              value={value}
              q={q}
              setQ={setQ}
              onSubmit={onSubmit}
              switchAdvanced={switchAdvanced}
            >
              {Object.keys(value?.filters || {}).map((f, i) => (
                <FilterPicker
                  key={f + i}
                  className="w-full"
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
                  onDelete={() => deleteFilter(f)}
                />
              ))}
            </QForm>
          </div>
        </div>
      </div>
    </div>
  );
}
