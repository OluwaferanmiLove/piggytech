import {
  StyleSheet,
  TextInput,
  TextProps,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  View,
} from "react-native";
import { hp, wp } from "@utils/responsive-dimension";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { ReactNode, useCallback, useEffect, useState } from "react";
import cx from "classnames";
import classNames from "classnames";
import { colors } from "src/theme/colors";
import { BaseText } from "../ui";

export interface InputProps extends TextInputProps {
  containerClasses?: TextProps["className"];
  value?: any;
  leftPadding?: number;
  label?: string;
  leftAccessory?: ReactNode;
  rightAccessory?: ReactNode;
  hasBorder?: boolean;
  name?: string;
  hasError?: boolean;
  error?: any;
}

const Input = ({
  label,
  leftAccessory,
  rightAccessory,
  leftPadding,
  value,
  containerClasses,
  hasBorder = true,
  name,
  onChangeText,
  onBlur,
  hasError,
  error,
  ...rest
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const textValue = value === undefined || value === null ? "" : String(value);

  const handleOnfocus = () => {
    setIsFocused(true);
  };

  const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <View>
      <Animated.View
        className={cx(
          "flex-row justify-center px-16 py-10 rounded-30 bg-gray1 border border-gray2",
          containerClasses
        )}
      >
        {leftAccessory}
        <View className="flex-1">
          {label && (
            <BaseText fontSize={10} numberOfLines={1} ellipsizeMode={"tail"}>
              {label}
            </BaseText>
          )}
          <View className="mt-3">
            <TextInput
              style={{
                marginVertical: 0,
                paddingVertical: 0,
                paddingLeft: 0,
              }}
              placeholderTextColor={colors.gray2}
              onFocus={handleOnfocus}
              onBlur={handleOnBlur}
              onChangeText={onChangeText}
              value={textValue}
              {...rest}
              className={classNames("font-interRegular text-white", rest.className, {
                "pt-0": rest?.multiline,
                "ml-14": leftAccessory,
              })}
            />
          </View>
        </View>
        {rightAccessory}
      </Animated.View>
        {error && (
          <View className="mt-5">
            <BaseText fontSize={10} weight={'medium'} className="text-red">
              {error}
            </BaseText>
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "Inter-Regular",
    color: colors.primary,
  },
});

export default Input;
