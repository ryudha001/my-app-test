import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from '../../components/ui';

interface NoInternetProp {
  retry: () => void;
  isChecking: Boolean;
}

const noInternetImage = require('../../../assets/images/no-internet.png');

export const NoInternet: React.FC<NoInternetProp> = ({ retry, isChecking }) => {
  return (
    <View style={styles.container}>
      <View style={styles.block1}>
        <Image
          source={noInternetImage}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.title}>No Internet</Text>
        <Text style={styles.title}>Connection</Text>
        <Text style={styles.text}>
          Please ensure that your device is connected to a Wi-Fi or Mobile Data
        </Text>
      </View>
      <View style={styles.block2}>
        <Text style={styles.subTitle}>When Overseas</Text>
        <Text style={styles.text}>
          1. Please ensure that data roaming is turned on in your phone settings
        </Text>
        <Text style={styles.text}>
          2. Please check your SMS for the list of supported service providers
        </Text>
      </View>
      <Button
        title="Retry"
        style={styles.button}
        onPress={() => retry()}
        loading={!!isChecking}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EEECDE',
  },
  image: {
    width: 200,
    height: 200,
  },
  block1: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  block2: {
    flex: 2,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontFamily: 'Athletics',
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 40,
    color: '#B14EB5',
  },
  text: {
    fontFamily: 'Athletics',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
    color: '#2B2B2B',
    width: '80%',
    textAlign: 'center',
    marginVertical: 5,
  },
  subTitle: {
    fontFamily: 'Athletics',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 28,
    color: '#2B2B2B',
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 60,
    width: '90%',
    borderRadius: 90,
  },
});
