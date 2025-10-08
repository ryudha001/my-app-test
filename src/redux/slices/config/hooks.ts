import { useDispatch, useSelector } from 'react-redux';
import { BUILD_FOR_RELEASE } from '../../../config';
import { RootReducer } from '../../root-reducer';

import { useSettings } from '../settings/hooks';
import { actions } from './reducer';

interface UseConfigResult {
  [key: string]: any;
  setConfig: (config: any) => void;
}

export const useConfig = (): UseConfigResult => {
  const { common } = useSelector((state: RootReducer) => state.config);
  const dispatch = useDispatch();
  const { env } = useSettings();

  const setConfig = (config: any) => {
    dispatch(actions.setConfig({ config }));
  };

  return {
    ...common,
    setConfig,
    buildForRelease: BUILD_FOR_RELEASE,
    slackWebhook:
      BUILD_FOR_RELEASE && env === 'prod'
        ? common.slackWebhook
        : common.slackWebhookDev,
  };
};
