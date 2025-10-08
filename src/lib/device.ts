import { Dimensions, NativeModules, PixelRatio, Platform } from 'react-native';
import {
  getBrand,
  getBundleId,
  getModel,
  getSystemVersion,
  getVersion,
} from 'react-native-device-info';

export interface Device {
  deviceId: string;
  deviceName: string;
  brand: string;
  model: string;
  os: string;
  osVersion: string;
  osMajorVersion: number | string;
  ios: boolean;
  ios10: boolean;
  ios11: boolean;
  ios12: boolean;
  ios13: boolean;
  ios14: boolean;
  iPad: boolean;
  android: boolean;
  android_7_8: boolean;
  android_8plus: boolean;
  android_13: boolean;
  appId: string;
  appVersion: string;
  env: string;
  pixelRatio: number;
  fontScale: number;
  fontScaleMax: number;
  fontScaleMin: number;
  fontScaleEnabled: boolean;
  dimensions: {
    scale: number;
    width: number;
    height: number;
    fontScale: number;
  };
  width: number;
  height: number;
  statusBarHeight: number;
  navBarHeight: number;
  tabBarHeight: number;
  longScreen: string;
  launchState: {
    launched: boolean;
    setIsLaunched: Function;
  };
  initialUrl: string;
  setInitialUrl: Function;
  linkingUrl: string;
  setLinkingUrl: Function;
  isValidDeeplinkSubsId: boolean;
  setIsValidDeeplinkSubsId: Function;
  isOpenedFromDeeplink: boolean;
  setIsOpenedFromDeeplink: Function;
  userAgent: string;
  setUserAgent: Function;
}

const { OS: os, Version: platformVersion } = Platform;
const model = getModel();
const ios = os === 'ios';
const android = os === 'android';
const iPad = ios && model.includes('iPad');
const osVersion = getSystemVersion();
const osMajorVersion = ios
  ? Number(osVersion.split('.')[0])
  : Number(osVersion);
const fontScaleMax = 1.2;
const fontScaleMin = 1;
const dimensions = Dimensions.get('window');

export const device = {
  deviceId: '',
  deviceName: '',
  brand: getBrand(),
  model,
  os,
  osVersion,
  osMajorVersion,
  ios,
  ios10: ios && osMajorVersion < 11,
  ios11: ios && osMajorVersion < 12,
  ios12: ios && osMajorVersion < 13,
  ios13: ios && osMajorVersion < 14,
  ios14: ios && osMajorVersion < 15,
  iPad,
  android,
  android_7_8:
    android && Number(platformVersion) >= 24 && Number(platformVersion) <= 27,
  android_8plus: android && Number(platformVersion) >= 26,
  android_13: android && Number(platformVersion) >= 32,
  appId: getBundleId(),
  appVersion: getVersion(),
  env: __DEV__ ? 'dev' : 'prod',
  pixelRatio: PixelRatio.get(),
  fontScale: Math.min(PixelRatio.getFontScale(), fontScaleMax),
  fontScaleMax,
  fontScaleMin,
  fontScaleEnabled: PixelRatio.getFontScale() >= fontScaleMin,
  dimensions,
  width: dimensions.width,
  height: dimensions.height,
  statusBarHeight: NativeModules.StatusBarManager.HEIGHT,
  navBarHeight: android ? 56 : 44,
  tabBarHeight: android ? 56 : 49,
  longScreen: '',
  launchState: {
    launched: false,
    setIsLaunched: () => {},
  },
  initialUrl: '',
  setInitialUrl: () => {},
  linkingUrl: '',
  setLinkingUrl: () => {},
  isValidDeeplinkSubsId: false,
  setIsValidDeeplinkSubsId: () => {},
  isOpenedFromDeeplink: false,
  setIsOpenedFromDeeplink: () => {},
  userAgent: '',
  setUserAgent: () => {},
};
