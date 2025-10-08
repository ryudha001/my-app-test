import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
  HapticOptions,
} from 'react-native-haptic-feedback';

const defaultOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const triggerHaptic = ({
  type = 'selection',
  options = {},
}: { type?: HapticFeedbackTypes; options?: HapticOptions } = {}) => {
  ReactNativeHapticFeedback.trigger(type, { ...defaultOptions, ...options });
};
