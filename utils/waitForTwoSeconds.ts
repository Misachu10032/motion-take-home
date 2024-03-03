export const waitTwoSeconds = (): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, 2000));