export const required = (value) => !!value || 'Required.'

export const maxCharacters = (maxCharacters) => {
  return (value) => {
    return (
      (value || '').length <= maxCharacters || `Max ${maxCharacters} characters`
    )
  }
}
