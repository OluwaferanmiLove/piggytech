import { ViewProps, ViewStyle } from 'react-native';
import * as Animatable from 'react-native-animatable';

export interface AnimatableViewPropsProps extends Animatable.AnimatableComponent<ViewProps, ViewStyle> {}

const AnimatableView = ({ ...props}: AnimatableViewPropsProps) => {
  return (
    <Animatable.View {...props}>

    </Animatable.View>
  );
};

export default AnimatableView;
