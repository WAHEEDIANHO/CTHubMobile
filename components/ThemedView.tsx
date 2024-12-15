import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import {SafeAreaView} from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  safe?: boolean
};

export function ThemedView({ style, lightColor, darkColor, safe=false, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return safe ? <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} /> :
      <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
