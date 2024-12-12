import classNames from 'classnames';
import React from 'react';
import { View, Text, ViewProps } from 'react-native';

interface SeparatorProps extends ViewProps {
  // Add your props here
  className: string
}

const Separator: React.FC<SeparatorProps> = ({className, ...props}) => {
  return (
    <View className={classNames('h-1 bg-gray1', className)} {...props} />
  );
};

export default Separator;
