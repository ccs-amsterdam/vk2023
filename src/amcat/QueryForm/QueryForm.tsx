import { useState } from "react";
import { useFields } from "@/amcat/api";
import { AmcatIndexName, AmcatQuery, AmcatUser } from "@/amcat/interfaces";
import MultilineQueryForm from "./MultilineQueryForm";
import SimpleQueryForm from "./SimpleQueryForm";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface QueryFormProps {
  user: AmcatUser;
  index: AmcatIndexName;
  value: AmcatQuery;
  onSubmit: (value: AmcatQuery) => void;
}

export default function QueryForm({
  user,
  index,
  value,
  onSubmit,
}: QueryFormProps) {
  const [simple, setSimple] = useState(true);
  const fields = useFields(user, index);

  if (!index) return null;
  const QForm = simple ? SimpleQueryForm : MultilineQueryForm;
  const handleClick = () => {
    setSimple(!simple);
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        className="p-1 w-full bg-gray-200 hover:bg-gray-300 rounded flex justify-center cursor-pointer items-center gap-1"
        onClick={handleClick}
      >
        <span className="text-sm">{simple ? "Advanced" : "Simple"}</span>
        {simple ? <ChevronDown /> : <ChevronUp />}
      </div>
      <QForm user={user} index={index} value={value} onSubmit={onSubmit} />
    </div>
  );
}
