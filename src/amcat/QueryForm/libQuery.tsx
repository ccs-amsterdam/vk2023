import { AmcatQueryTerm } from "../interfaces";

export function queriesToString(queries: AmcatQueryTerm[]): string {
  if (!queries) return "";
  return queries
    .map((query) => {
      if (query.label) return `${query.label} = ${query.query}`;
      return query.query;
    })
    .join("; ");
}

export function queriesFromString(q: string): AmcatQueryTerm[] {
  if (!q?.trim()) return [];
  const queries = q.split(/[\n;]/).map((s) => s.trim());
  return queries.map((s, i) => queryfromString(s));
}

function queryfromString(q: string): AmcatQueryTerm {
  const labelRE = /(?<=\w\s*)=/;
  const m = q.match(labelRE);
  if (!m?.index) return { query: q.trim() };
  return {
    label: q.slice(0, m.index).trim(),
    query: q.slice(m.index + m.length).trim(),
  };
}
