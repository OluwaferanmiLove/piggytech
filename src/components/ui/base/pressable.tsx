import React, { ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export interface PressableProps extends TouchableOpacityProps {
  children?: ReactNode;
  trackingText?: string;
  onPress?: VoidFunction
}

const Pressable = ({ children, trackingText, ...rest }: PressableProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} {...rest}>
      {children}
    </TouchableOpacity>
  );
};

export default Pressable;
