export function trimText({ value }: { value: unknown }) {
  return typeof value === 'string' ? value.trim() : value;
}

export function nullableTrimmedText({ value }: { value: unknown }) {
  return typeof value === 'string' ? value.trim() || null : value;
}
