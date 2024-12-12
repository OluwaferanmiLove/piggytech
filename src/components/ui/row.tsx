import { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';
import cx from 'classnames';

export interface RowProps extends Partial<ViewProps> {
  children?: ReactNode;
  className?: string;
}

const Row = ({ children, className, ...props }: RowProps) => {
  return (
    <View className={cx('flex-row items-center justify-between', className)} {...props}>
      {children}
    </View>
  );
};

export default Row;
