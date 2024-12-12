import { ReactNode, useMemo } from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import cx from 'classnames';
import { hp, wp } from '@utils/responsive-dimension';

export type BaseTextProps = {
  fontSize?: number;
  lineHeight?: number;
  children?: ReactNode;
  weight?: 'bold' | 'light' | 'regular' | 'medium' | 'semiBold' | 'bold' | 'black';
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
  style?: Partial<TextStyle>;
} & Omit<TextProps, 'style'>;

const BaseText = ({
  className,
  weight = 'regular',
  children,
  fontSize = 13,
  lineHeight,
  textTransform,
  style,
  ...props
}: BaseTextProps) => {
  const responsiveFs = useMemo(() => wp(fontSize), []);

  return (
    <Text
      className={cx(textSettings.className, textSettings.weight[weight], className)}
      // className={cx(textSettings.classes, textSettings.weight[weight], classes)}
      style={{
        fontSize: wp(fontSize),
        letterSpacing: textSettings.letterSpacing(responsiveFs),
        lineHeight: lineHeight ? hp(lineHeight) : undefined,
        textTransform: textTransform,
        ...style,
      }}
      {...props}>
      {children}
    </Text>
  );
};

const textSettings = {
  className: 'font-interRegular text-white',
  letterSpacing: (size: number) => 0,
  weight: {
    light: 'font-interLight',
    regular: 'font-interRegular',
    medium: 'font-interMedium',
    semiBold: 'font-interSemiBold',
    bold: 'font-inter700Bold',
    black: 'font-interBlack',
    extraBold: 'font-interExtraBold',
  },
};

export default BaseText;
