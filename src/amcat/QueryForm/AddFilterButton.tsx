import { useState } from "react";
import { AmcatField, AmcatQuery } from "../../interfaces";
import { getFieldTypeIcon } from "../../Amcat";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function fieldOptions(fields: AmcatField[], query: AmcatQuery) {
  return fields
    .filter((f) => !Object.keys(query?.filters || {}).includes(f.name))
    .filter((f) => ["date", "keyword", "tag"].includes(f.type));
}

interface AddFilterProps {
  options: AmcatField[];
  onClick: (value: string) => void;
  addFilterLabel?: string;
  className: string;
}
export default function AddFilterButton({
  options,
  onClick,
  className,
  addFilterLabel,
}: AddFilterProps) {
  const [addOpen, setAddOpen] = useState(false);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn("whitespace-nowrap bg-background border-2", className)}
        >
          {addFilterLabel || "Add Filter"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-1">
          {options.map((f) => (
            <Button
              className="bg-background border-2"
              key={f.name}
              icon
              labelPosition="left"
              onClick={() => {
                setAddOpen(false);
                onClick(f.name);
              }}
            >
              {/* <Icon name={getFieldTypeIcon(f.type)} /> */}
              {f.name}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
