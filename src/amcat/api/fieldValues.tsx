import { AmcatUser, AmcatIndexName } from "@/amcat/interfaces";
import { useQuery } from "@tanstack/react-query";

export function useFieldValues(
  user: AmcatUser,
  index: AmcatIndexName,
  field: string
) {
  const query = useQuery({
    queryKey: ["fieldValues", user, index, field],
    queryFn: async () =>
      getFieldValues(user, index, field).then((res) => res.data),
  });

  const fieldValues: string[] = query.data || [];
  return { ...query, fieldValues };
}

export function getFieldValues(
  user: AmcatUser,
  index: AmcatIndexName,
  field: string
) {
  return user.api.get(`index/${index}/fields/${field}/values`);
}
