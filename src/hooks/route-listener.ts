import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useCallback } from 'react';
import { consoleLog } from '../lib';

export const useRouteListener = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        consoleLog('[route]', route);
      });

      return () => {
        unsubscribe();
      };
    }, [navigation, route]),
  );
};
