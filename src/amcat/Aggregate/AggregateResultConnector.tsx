import {
  AmcatUser,
  AmcatIndexName,
  AmcatQuery,
  AggregationOptions,
} from "@/amcat/interfaces";

import AggregateResult from "./AggregateResult";

interface Props {
  user: AmcatUser;
  index: AmcatIndexName;
  query: AmcatQuery;
  options: AggregationOptions;
}

export default function AggregateResultConnector({
  user,
  index,
  query,
  options,
}: Props) {
  if (index == null) return null;
  return (
    <div
      style={{
        width: "100%",
        maxHeight: "800px",
        overflowX: "auto",
        overflowY: "auto",
      }}
    >
      <AggregateResult
        user={user}
        index={index}
        query={query}
        options={options}
      />
    </div>
  );
}
