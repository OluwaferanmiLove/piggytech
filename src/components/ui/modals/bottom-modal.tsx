import React, { ReactNode, useEffect, useState } from 'react';
import Modal, { ModalProps } from 'react-native-modal';
import { Dimensions, Platform, ScrollView, Text, View, ViewProps, ViewStyle, StyleSheet } from 'react-native';
import Row from '../row';
import { CloseCircle } from 'iconsax-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useVector, snapPoint } from 'react-native-redash';
import { heightPercentageToDP, hp } from '@utils/responsive-dimension';
import Button, { ButtonProps } from '../buttons/button';
import { BaseText } from '../base';
import { SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import FixedBtnFooter from '../buttons/fixed-btn-footer';
import cx from 'classnames';
import { colors } from 'src/theme/colors';
import useLayoutHeight from 'src/hooks/use-layout-height';

export interface BottomModalProps extends Partial<ModalProps> {
  headerAddon?: ReactNode;
  children?: ReactNode;
  footerElement?: ReactNode;
  closeModal: () => void;
  showButton?: boolean;
  buttons?: ButtonProps[];
  title?: string;
  modalStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  innerStyle?: ViewStyle;
  contentContainerClass?: ViewProps['className'];
}

const BottomModal = ({
  headerAddon,
  children,
  footerElement,
  title,
  showButton = true,
  buttons,
  modalStyle,
  containerStyle,
  innerStyle,
  closeModal = () => {},
  contentContainerClass,
  ...rest
}: BottomModalProps) => {
  const [height, setHeight] = useState(0);
  const insert = useSafeAreaInsets().bottom;
  const insertTop = useSafeAreaInsets().top + hp(12);
  const bottom = Platform.select({ ios: insert + 12, android: 12 });
  const isGestureActive = useSharedValue(false);
  const translation = useVector();

  const onGestureEvent = Gesture.Pan()
    .onStart(() => (isGestureActive.value = true))
    .onChange(({ translationY }) => {
      const isPositiveNumber = Math.sign(translationY);
      if (isPositiveNumber === 1) {
        translation.y.value = translationY;
      }
    })
    .onEnd(({ translationY, velocityY }) => {
      const snapBack = snapPoint(translationY, velocityY, [0, height]) === height;

      if (snapBack) {
        runOnJS(closeModal)();
        translation.y.value = withDelay(900, withTiming(0));
      } else {
        isGestureActive.value = false;
        translation.y.value = withSpring(0);
      }
    });

  const style = useAnimatedStyle(() => {
    // const scale = interpolate(
    //   translation.y.value,
    //   [0, height],
    //   [1, 0.5],
    //   Extrapolation.CLAMP
    // );

    return {
      transform: [{ translateY: translation.y.value }],
    };
  });

  const { onLayout, flexStyle } = useLayoutHeight(0);

  return (
    <Modal
      avoidKeyboard={true}
      onBackdropPress={() => closeModal()}
      backdropColor={'#1E1E1E80'}
      useNativeDriverForBackdrop={true}
      onBackButtonPress={() => closeModal!()}
      style={[{ flex: 1, justifyContent: 'flex-end', margin: 0 }, modalStyle]}
      {...rest}>
      <GestureHandlerRootView style={[{ justifyContent: 'flex-end'}, flexStyle]}>
        <GestureDetector gesture={onGestureEvent}>
          <Animated.View
            style={[style, { justifyContent: 'flex-end', marginTop: insertTop }, containerStyle, flexStyle]}
            onLayout={e => {
              onLayout(e);
              setHeight(e.nativeEvent.layout.height);
            }}>
            <View
              style={[{ paddingBottom: showButton ? 0 : bottom }, innerStyle]}
              className={`bg-black rounded-t-[20px] ${contentContainerClass}`}>
              <View className="h-3 w-50 my-14 rounded-full bg-white opacity-50 self-center" />
              <ScrollView bounces={false}>
                {/* <View className="mb-20 self-center bg-grey-muted rounded-30 w-50 h-5" /> */}
                <Row
                  className={cx('justify-between px-20', { 'pb-20': Boolean(title || headerAddon) })}
                  onLayout={onLayout}
                  style={flexStyle}>
                  {title && <BaseText fontSize={15}>{title}</BaseText>}
                  {headerAddon && headerAddon}
                </Row>
                {children}
                {showButton && !footerElement && <FixedBtnFooter buttons={buttons!} />}
                {footerElement && footerElement}
              </ScrollView>
            </View>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default BottomModal;
