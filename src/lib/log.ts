import { BUILD_FOR_RELEASE } from '../config';

export const consoleLog = (...params: any[]) => {
  BUILD_FOR_RELEASE || console.log(...params);
};
