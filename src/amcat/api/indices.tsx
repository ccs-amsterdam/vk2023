import { AmcatIndex, AmcatUser } from "@/amcat/interfaces";
import { useQuery } from "@tanstack/react-query";

export default function useAmcatIndices(user: AmcatUser) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["indices", user],
    queryFn: async () => {
      if (user == null) return null;
      const res = await getIndices(user);
      return res.data;
    },
    enabled: user != null,
    staleTime: 60000,
  });

  const indices: AmcatIndex[] = data ? Object.values(data) : [];
  return { indices, isLoading, error, refetch };
}

export async function getIndices(user: AmcatUser) {
  return user.api.get(`/index/`);
}
