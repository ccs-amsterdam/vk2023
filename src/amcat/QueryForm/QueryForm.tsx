import { useEffect, useRef, useState } from "react";
import { AmcatIndexName, AmcatQuery, AmcatUser } from "@/amcat/interfaces";
import MultilineQueryForm from "./MultilineQueryForm";
import SimpleQueryForm from "./SimpleQueryForm";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface QueryFormProps {
  user: AmcatUser;
  index: AmcatIndexName;
  value: AmcatQuery;
  onSubmit: (value: AmcatQuery) => void;
  switchAdvanced: () => void;
}

export default function QueryForm({
  user,
  index,
  value,
  onSubmit,
}: QueryFormProps) {
  const [advanced, setAdvanced] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

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

  const QForm = advanced ? MultilineQueryForm : SimpleQueryForm;

  return (
    <div className="flex flex-col gap-3">
      {/* <div
        className="p-1 w-full bg-gray-200 hover:bg-gray-300 rounded flex justify-center cursor-pointer items-center gap-1"
        onClick={switchAdvanced}
      >
        <span className="text-sm">{!advanced ? "Advanced" : "Simple"}</span>
        {!advanced ? <ChevronDown /> : <ChevronUp />}
      </div> */}
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
              onSubmit={onSubmit}
              switchAdvanced={switchAdvanced}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
