export const getColorName = async (hex: string) => {
  const cleanedHex = hex.replace('#', '')
  const res = await fetch(`https://www.thecolorapi.com/id?hex=${cleanedHex}`)
  if (!res.ok) throw new Error('Error fetching color name')
  const data = await res.json()
  return data.name.value 
}

export const getColorNames = async (colors: string[]) => {
  return Promise.all(colors.map((color) => getColorName(color)))
}
