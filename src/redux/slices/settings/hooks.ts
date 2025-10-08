import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from '../../root-reducer';

import { actions } from './reducer';

export const useSettings = () => {
  const settings = useSelector((state: RootReducer) => state.settings);
  const dispatch = useDispatch();

  const setSettings = (newSettings: any) => {
    dispatch(
      actions.setSettings({ settings: { ...settings, ...newSettings } }),
    );
  };

  return {
    ...settings,
    isProd: settings.env === 'prod',
    setSettings,
  };
};
