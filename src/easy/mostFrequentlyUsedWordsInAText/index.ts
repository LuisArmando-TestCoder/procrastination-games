const specialCharacters = '#\/@><":,'.split('').join("|")

export default (text: string) => {
  let tokens: string | string[] = text
  
  tokens = tokens.replace(new RegExp(specialCharacters, 'g'), ' ')
  tokens = tokens.replace(/\.|\n|(' )/g, ' ')
  tokens = tokens.split(' ')
  
  const occurrences: {[index: string]: number} = {}
  
  for (const occurrence of tokens) {
    if (occurrence) {
      const keyInsensitiveOccurrence = occurrence.toLowerCase().replace(
        /:|,/g, ''
      )
      occurrences[keyInsensitiveOccurrence] = (
        occurrences[keyInsensitiveOccurrence] || 0
      ) + 1
    }
  }

  return Object.entries(occurrences).sort(([_0, a], [_1, b]) => {
    return b - a
  }).map(([character]) => character).slice(0, 3)
}