export function base64ToFile(
  base64: string,
  filename: string,
  mimeType: string
): File {
  const byteCharacters = atob(base64.split(",")[1]) // Decode Base64
  const byteNumbers = new Array(byteCharacters.length)

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }

  const byteArray = new Uint8Array(byteNumbers)
  const file = new File([byteArray], filename, { type: mimeType })
  return file
}
