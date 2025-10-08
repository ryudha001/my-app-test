import { useTheme } from '@react-navigation/native';
import { useContext } from 'react';

import { ActionContext } from '../contexts/action-context';
import { DeviceContext } from '../contexts/device-context';
import { GatewayContext } from '../contexts/gateway-context';
import { SpinnerContext } from '../contexts/spinner-context';
import { MyTheme } from '../styles/theme';

export const useAction = () => useContext(ActionContext);
export const useDevice = () => useContext(DeviceContext);
export const useSpinner = () => useContext(SpinnerContext);
export const useGateway = () => useContext(GatewayContext);

export { useWatchdog } from './watchdog';
export { useEvent, EVENT, dispatchEvent } from './emitter';
export { useRouteListener } from './route-listener';

export const useMyTheme = () => useTheme() as MyTheme;
