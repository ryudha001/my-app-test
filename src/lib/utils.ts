export const wait = (timeInMs: number): Promise<void> =>
  new Promise(res => setTimeout(res, timeInMs));
