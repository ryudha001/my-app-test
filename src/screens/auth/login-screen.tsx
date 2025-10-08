import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, Input, InputPassword } from '../../components/ui';
import { AuthContainer } from '../../components/auth';
import { useAuth } from '../../redux/slices/auth/hooks';

export const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);
  const { loginMutation } = useAuth();

  const onSubmitLogin = async () => {
    setErrorMessage('');
    await loginMutation.mutateAsync({ username, password });
  };

  return (
    <AuthContainer
      dark={focused}
      onTouchStart={() => console.log('onTouchStart')}
    >
      <View style={styles.container}>
        <View style={styles.buttonsView}>
          <Input
            placeholder={'Enter username'}
            keyboardType="email-address"
            containerStyle={[styles.inputContainer]}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChangeText={text => {
              const str = text.trim();
              setUsername(str);
              if (errorMessage) setErrorMessage('');
            }}
            errorMessage={errorMessage}
            value={username}
          />
          <InputPassword
            placeholder={'Enter password'}
            isResetPassword
            secureTextEntry
            containerStyle={[styles.inputContainer]}
            style={''}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            value={password}
            onChangeText={text => {
              setPassword(text);
              if (errorMessage && !text) setErrorMessage('');
            }}
            errorMessage={errorMessage}
          />
          <Button
            title={'Login'}
            style={styles.continueButton}
            onPress={onSubmitLogin}
          />
        </View>
      </View>
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  topBar: {
    width: '100%',
  },
  container: {
    alignItems: 'center',
    marginTop: '50%',
    height: Dimensions.get('window').height,
  },
  logo: {},
  inputContainer: {
    width: '90%',
    marginBottom: 5,
  },
  buttonsView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    width: '90%',
    height: 60,
  },
  signupButton: {
    width: '90%',
    marginTop: 20,
    height: 40,
  },
});
