import React from 'react';
import { Platform, View, ViewProps } from 'react-native';
import Button, { ButtonProps } from '@components/ui/buttons/button';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import cx from 'classnames';

export interface FixedBtnFooterProps extends Partial<ViewProps> {
  buttons: ButtonProps[];
  className?: string
}

const FixedBtnFooter = ({ buttons = [], className, ...props }: FixedBtnFooterProps) => {
  const { bottom } = useSafeAreaInsets();

  const insertBottom = Platform.select({ ios: bottom, android: bottom + 12 });

  return (
    <View
      {...props}
      className={cx('flex-row pt-10 px-20', className, { 'gap-x-10': buttons.length > 1 })}
      style={{ paddingBottom: insertBottom }}>
      {buttons.map(props => (
        <View key={props.text} className="flex-1">
          <Button {...props} />
        </View>
      ))}
    </View>
  );
};

export default FixedBtnFooter;
