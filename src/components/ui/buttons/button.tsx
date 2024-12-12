import React, { ReactNode } from 'react';
import { BaseText } from '../base';
import cx from 'classnames';
import Pressable, { PressableProps } from '../base/pressable';
import { View } from 'react-native';
import { hp } from '@utils/responsive-dimension';

export interface ButtonProps extends PressableProps {
  text: string;
  textColor?: TextColor;
  negative?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
  btnStyle?: string;
  leftAddOn?: ReactNode;
  rightAddOn?: ReactNode;
  addOnIcon?: ReactNode;
}

export enum ButtonSize {
  'MEDIUM' = 'MEDIUM',
  'LARGE' = 'LARGE',
}

export enum ButtonVariant {
  PRIMARY = 'Primary',
  LIGHT = 'Light',
  DARK = 'Dark',
  OUTLINE = 'Outline',
}

export enum TextColor {
  'NEGATIVE' = 'Negative',
  'WHITE' = 'White',
  DARK = 'Dark',
}

const Button = ({
  text,
  disabled,
  isLoading,
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.LARGE,
  textColor = TextColor.DARK,
  // textColor,
  className,
  loadingText,
  btnStyle,
  leftAddOn,
  rightAddOn,
  addOnIcon,
  ...rest
}: ButtonProps) => {
  return (
    <Pressable
      className={cx(
        'py-18',
        variantStyle[variant].classes,
        'flex justify-center items-center',
        sizeProperties[size].style,
        { 'flex-row': rest.children || leftAddOn || rightAddOn },
        { 'opacity-30': disabled || isLoading },
        btnBaseStyle,
        className,
      )}
      disabled={disabled || isLoading}
      {...rest}>
      {leftAddOn || (rightAddOn && <View style={{ flex: 0.2, alignItems: 'flex-start' }}>{leftAddOn}</View>)}
      <View
        className={cx(
          { 'flex-1 items-center justify-center': rest.children || leftAddOn || rightAddOn },
          { 'flex-row': addOnIcon },
        )}>
        {addOnIcon}
        <BaseText
          fontSize={sizeProperties[size].fontSize}
          weight={sizeProperties[size].weight as 'semiBold'}
          className={cx({
            'text-white':
              variant === ButtonVariant.DARK || textColor === TextColor.WHITE || variant === ButtonVariant.OUTLINE,
            'text-dark':
              textColor === TextColor.DARK || variant === ButtonVariant.PRIMARY || variant === ButtonVariant.LIGHT,
          })}>
          {isLoading ? loadingText ?? 'Loading...' : text}
        </BaseText>
      </View>
      {leftAddOn || (rightAddOn && <View style={{ flex: 0.2, alignItems: 'flex-end' }}>{rightAddOn}</View>)}
    </Pressable>
  );
};

const btnBaseStyle = 'items-center justify-center';

const variantStyle = {
  [ButtonVariant.LIGHT]: { classes: 'w-full bg-white' },
  [ButtonVariant.PRIMARY]: { classes: 'w-full bg-primary' },
  [ButtonVariant.DARK]: { classes: 'w-full bg-gray1' },
  [ButtonVariant.OUTLINE]: { classes: 'w-full border border-gray1' },
};

const sizeProperties = {
  [ButtonSize.MEDIUM]: { height: 40, style: 'rounded-full px-20', fontSize: 12, weight: 'semiBold' },
  [ButtonSize.LARGE]: { height: 55, style: 'rounded-full px-25', fontSize: 14, weight: 'semiBold' },
};

export default Button;
