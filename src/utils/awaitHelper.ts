export const waitTwoSeconds = (): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, 2000));

export const waitForXSeconds = (second:number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, second*1000));