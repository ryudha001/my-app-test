import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Toast, {
  ToastConfig,
  ToastShowParams,
} from 'react-native-toast-message';

import { Icon } from './icon';

const SuccessMessage = ({
  text1,
  text2,
}: {
  text1: string | undefined;
  text2: string | undefined;
}) => {
  return (
    <View style={[styles.messageView, styles.messageSuccess]}>
      <Icon name="check-circle" size={24} color="#fff" />
      <View style={styles.textView}>
        {text1 ? <Text style={styles.text1}>{text1}</Text> : null}
        {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
      </View>
    </View>
  );
};

const ErrorMessage = ({
  text1,
  text2,
}: {
  text1: string | undefined;
  text2: string | undefined;
}) => {
  return (
    <View style={[styles.messageView, styles.messageError]}>
      <Icon name="close-circle-outline" size={24} color="#fff" />
      <View style={styles.textView}>
        {text1 ? <Text style={styles.text1}>{text1}</Text> : null}
        {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
      </View>
    </View>
  );
};

const WarningMessage = ({
  text1,
  text2,
}: {
  text1: string | undefined;
  text2: string | undefined;
}) => {
  return (
    <View style={[styles.messageView, styles.messageWarning]}>
      <Icon name="close-circle-outline" size={24} color="#fff" />
      <View style={styles.textView}>
        {text1 ? <Text style={styles.text1}>{text1}</Text> : null}
        {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
      </View>
    </View>
  );
};

const config: ToastConfig = {
  success: props => <SuccessMessage {...props} />,
  error: props => <ErrorMessage {...props} />,
  warn: props => <WarningMessage {...props} />,
};

export function ToastMessage() {
  return <Toast config={config} topOffset={60} visibilityTime={5000} />;
}

const styles = StyleSheet.create({
  messageView: {
    flex: 1,
    width: '90%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
  },
  messageSuccess: {
    backgroundColor: '#309900',
  },
  messageError: {
    backgroundColor: '#f84861',
  },
  messageWarning: {
    backgroundColor: '#FFB000',
  },
  textView: {
    flexShrink: 1,
    paddingHorizontal: 8,
    borderRadius: 5,
    overflow: 'hidden',
  },
  text1: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  text2: { color: '#fff', fontSize: 16 },
});

export const showToast = (params: ToastShowParams) => {
  return Toast.show({ ...params, swipeable: true });
};
