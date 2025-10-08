import NetInfo from '@react-native-community/netinfo';
import PropTypes from 'prop-types';
import type { ReactNode } from 'react';
import React, { createContext, useEffect, useState } from 'react';
import {
  getDeviceName,
  getUserAgent,
  syncUniqueId,
} from 'react-native-device-info';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoInternet } from '../features/settings/no-internet';
import { device, Device } from '../lib';
import { wait } from '../lib/utils';

interface DeviceContextValue extends Device {}
interface DeviceProviderProps {
  children?: ReactNode;
}
export const DeviceContext = createContext<DeviceContextValue>(device);

export const DeviceProvider = (props: DeviceProviderProps) => {
  const { children } = props;
  const [deviceId, setDeviceId] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const insets = useSafeAreaInsets();
  const [isInternetReachable, setIsInternetReachable] = useState<Boolean>(true);
  const [isChecking, setIsChecking] = useState<Boolean>(false);
  const [userAgent, setUserAgent] = useState<string>('');

  NetInfo.configure({
    reachabilityUrl: 'https://google.com/',
    reachabilityTest: async response =>
      response.status >= 200 && response.status < 400,
  });

  const checkInternet = async () => {
    setIsChecking(true);
    await wait(1000);
    NetInfo.fetch()
      .then(state => {
        setIsInternetReachable(
          typeof state.isInternetReachable === 'boolean'
            ? state.isInternetReachable
            : true,
        );
      })
      .finally(() => {
        setIsChecking(false);
      });
  };

  useEffect(() => {
    const fetchUserAgent = async () => {
      const data = await getUserAgent();
      setUserAgent(data);
    };

    fetchUserAgent();
  }, []);

  useEffect(() => {
    syncUniqueId().then(uniqueId => setDeviceId(uniqueId));
    getDeviceName().then(name => setDeviceName(name));
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isInternetReachable === null) {
        checkInternet();
      } else {
        setIsInternetReachable(state.isInternetReachable);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return isInternetReachable ? (
    <DeviceContext.Provider
      value={{
        ...device,
        deviceId,
        deviceName,
        navBarHeight: device.ios
          ? insets.top + device.navBarHeight
          : device.navBarHeight,
        userAgent,
        setUserAgent,
      }}
    >
      {!(deviceId && deviceName) ? null : children}
    </DeviceContext.Provider>
  ) : (
    <NoInternet retry={checkInternet} isChecking={isChecking} />
  );
};

DeviceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const DeviceConsumer = DeviceContext.Consumer;
