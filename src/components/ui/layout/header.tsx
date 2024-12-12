import React from 'react';
import { View, Text } from 'react-native';
import Row from '../row';
import { BaseText, Pressable } from '../base';
import { CustomImage } from '../others';
import { hp, wp } from 'src/utils/responsive-dimension';
import { ArrowLeft, Edit, SearchNormal, SearchNormal1 } from 'iconsax-react-native';
import { colors } from '@theme/colors';
import { useNavigation } from '@react-navigation/native';
import classNames from 'classnames';

export interface HeaderProps {
  pageTitle?: string;
  showBack?: boolean;
  showBorder?: boolean;
  onPressBack?: VoidFunction;
}

const Header: React.FC<HeaderProps> = ({ pageTitle, showBack = true, showBorder, onPressBack }) => {
  const navigation = useNavigation();
  return (
    <Row className={classNames("px-20 py-10", {'border-b border-b-gray1': showBorder})}>
      <View style={{ flex: 0.2 }}>
        {showBack && (
          <Pressable onPress={onPressBack ? onPressBack : () => navigation.goBack()}>
            <ArrowLeft size={wp(18)} color={colors.white} />
          </Pressable>
        )}
      </View>
      <View className="items-center justify-center">
        <BaseText weight="semiBold">{pageTitle}</BaseText>
      </View>
      {/* <View style={{ flex: 0.2, alignItems: "flex-end" }}>
        <Pressable onPress={onPressBack}>
          <Edit color={colors.white} size={wp(18)} />
        </Pressable>
      </View> */}
    </Row>
  );
};

export default Header;
