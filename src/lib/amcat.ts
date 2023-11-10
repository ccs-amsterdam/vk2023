import axios from "axios";

const server = "http://localhost/amcat";

export async function getFields(index: string) {
  return axios.get(`${server}/index/${index}/fields`);
}

export interface QueryParams {
  index: string;
  queries: Queries;
  fields: Fields;
  filters: Filters;
}

export async function postQuery({
  index,
  queries,
  fields,
  filters,
  sort,
}: QueryParams) {
  return axios.post(`${server}/index/${index}/query`, {
    q: queries,
    fields,
    filters,
    sort,
  });
}

export interface AggregateParams {
  index: string;
  queries: Queries;
  axes: Axes[];
  aggregations: Aggregations[];
  filters: Filters;
}

export async function postAggregate({
  index,
  queries,
  axes,
  aggregations,
  filters,
}: AggregateParams) {
  return axios.post(`${server}/index/${index}/aggregate`, {
    axes,
    aggregations,
    queries,
    filters,
  });
}

export interface Axes {
  field: string;
  interval: string;
}
export interface Aggregations {
  field: string;
  function: string;
  name: string;
}
export interface Filters {
  [key: string]: string;
}
export type Fields = string[];
export type Queries = string;
