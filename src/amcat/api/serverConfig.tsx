import { useQuery } from "@tanstack/react-query";
import { AmcatServerConfig, AmcatUser } from "@/amcat/interfaces";
import { AxiosResponse } from "axios";

export function useServerConfig(user?: AmcatUser) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["serverconfig", user?.email],
    queryFn: async () => {
      if (user == null) return null;
      const res = await getServerConfig(user);
      return res.data;
    },
  });

  const serverConfig: AmcatServerConfig | undefined = data || undefined;
  return { serverConfig, isLoading, error, refetch };
}

/** Get server config */
export function getServerConfig(user: AmcatUser) {
  return user.api.get(`/config`) as Promise<AxiosResponse<AmcatServerConfig>>;
}
