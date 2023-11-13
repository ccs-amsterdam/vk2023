import { AmcatUser, AmcatIndexName, AmcatField } from "@/amcat/interfaces";
import { useQuery } from "@tanstack/react-query";

export function useFields(user: AmcatUser, index: AmcatIndexName | undefined) {
  const query = useQuery({
    queryKey: ["fields", user, index],
    queryFn: () => getFields(user, index || ""),
    enabled: index != null,
  });

  const fields: AmcatField[] = query.data ? Object.values(query.data) : [];
  return { ...query, fields };
}

export function getFields(user: AmcatUser, index: AmcatIndexName) {
  return user.api.get(`/index/${index}/fields`).then((res) => res.data);
}

export function getField(
  fields: AmcatField[],
  fieldname: string
): AmcatField | undefined {
  const i = fields.map((f) => f.name).indexOf(fieldname);
  if (i === -1) return undefined;
  return fields[i];
}
