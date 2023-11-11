import { useFieldValues } from "@/amcat/api";
import {
  AmcatUser,
  AmcatField,
  AmcatFilter,
  AmcatIndexName,
  DateFilter,
} from "@/amcat/interfaces";
import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "./DatePicker";

interface FilterPopupProps {
  user: AmcatUser;
  index: AmcatIndexName;
  field: AmcatField | undefined;
  value: AmcatFilter | undefined;
  onChange: (value: AmcatFilter) => void;
}

export function filterLabel(
  field: AmcatField | undefined,
  filter: AmcatFilter | undefined,
  includeName = false
) {
  if (field == null || filter == null) return null;

  const name = includeName ? `${field.name} ` : "";

  let values = "";
  if (field.type === "date") {
    if (filter.gte && filter.lte) values = `${filter.gte} / ${filter.lte}`;
    if (filter.gte && !filter.lte) values = `from ${filter.gte}`;
    if (filter.lte && !filter.gte) values = `until ${filter.lte}`;
  } else {
    if (filter.values) {
      values = `${filter.values.length} selected`;
    }
  }

  if (values)
    return (
      <div className="w-full flex justify-between gap-2">
        <div className="bg-primary">{name}</div>
        {values}
      </div>
    );

  return (
    <span>
      select <b>{field.name}</b>
    </span>
  );
}

export function FilterPopup({
  user,
  index,
  field,
  value,
  onChange,
}: FilterPopupProps) {
  if (field == null || value == null) return null;

  if (field.type === "date")
    return DateRangePopup({ user, index, field, value, onChange });
  return KeywordPopup({ user, index, field, value, onChange });
}

export function KeywordPopup({
  user,
  index,
  field,
  value,
  onChange,
}: FilterPopupProps) {
  if (field == null || value == null) return null;

  const values = useFieldValues(user, index, field.name);
  const selected = value?.values || [];
  if (values.length === 0) return null;

  function handleChange(checked: boolean, v: string) {
    console.log(checked);
    if (checked && !selected.includes(v))
      onChange({ values: [...selected, v] });
    if (!checked && selected.includes(v))
      onChange({ values: selected.filter((x) => x !== v) });
  }

  return (
    <div>
      {values.map((v, i) => {
        const checked = selected.includes(v);
        return (
          <div
            key={v + i}
            className="flex items-center gap-3 py-1"
            onClick={() => handleChange(!checked, v)}
          >
            <Checkbox key={i} checked={checked} className="w-5 h-5" />
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {v}{" "}
            </label>
          </div>
        );
      })}
    </div>
  );
}

function date2str(date: Date, ifNone = ""): string {
  if (!date) return ifNone;
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const year = date.getFullYear();
  return year + "-" + month + "-" + day;
}

export function DateRangePopup({ value, onChange }: FilterPopupProps) {
  if (value == null) return null;

  const handleChange = (key: keyof DateFilter, newval?: Date) => {
    if (!newval) return;
    let result = { ...value };
    if (newval == null) {
      delete result[key];
    } else result[key] = date2str(newval);
    onChange(result);
  };
  return (
    <div className="w-full flex flex-col gap-2">
      <DatePicker
        label={"from date"}
        value={value.gte ? new Date(value.gte) : undefined}
        onChange={(newval) => handleChange("gte", newval)}
      />
      <DatePicker
        label={"to date"}
        value={value.lte ? new Date(value.lte) : undefined}
        onChange={(newval) => handleChange("lte", newval)}
      />
    </div>
  );
}
