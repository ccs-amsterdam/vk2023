import {
  AmcatUser,
  AmcatField,
  AmcatFilter,
  AmcatIndexName,
} from "@/amcat/interfaces";
import { filterLabel, FilterPopup } from "./FilterPopups";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterPickerProps {
  user: AmcatUser;
  index: AmcatIndexName;
  field: AmcatField | undefined;
  value: AmcatFilter | undefined;
  onChange: (value: AmcatFilter) => void;
  onDelete?: () => void;
  className?: string;
  [key: string]: any;
}
export default function FilterPicker({
  user,
  index,
  field,
  value,
  onChange,
  onDelete,
  className,
  ...props
}: FilterPickerProps) {
  if (field == null || value == null) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "whitespace-nowrap flex gap-2 justify-between pr-1 bg-background border-2",
            className
          )}
        >
          {filterLabel(field, value, true)}
          {onDelete == null ? null : (
            <div onClick={onDelete}>
              <X />
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <FilterPopup
          user={user}
          index={index}
          field={field}
          value={value}
          onChange={onChange}
        />
      </PopoverContent>
    </Popover>
  );
}
