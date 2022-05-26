export const filterBreeds = (query: string, suggestions: string[]) => {
  if (!query) { return [] }
  return suggestions.filter(suggestion => suggestion.toLowerCase().startsWith(query.toLowerCase()))
}
