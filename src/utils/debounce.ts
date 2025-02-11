export const debounce = (callback: Function, delay: number) => {
  let timerId: any
  return (...args: any[]) => {
    if (timerId) clearTimeout(timerId)
    timerId = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}
