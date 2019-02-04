export const chunkList = (list, size) => {
  if (!list || list.length === 0 || size === 0) return []

  return list.reduce((acc, val) => {
    if (acc.length === 0) acc.push([])
    const last = acc[acc.length - 1]
    if (last.length < size) {
      last.push(val)
    } else {
      acc.push([])
    }
    return acc
  }, [])
}
