import { Appearance, View } from "react-native";
import { ReactNode, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import Header, { HeaderProps } from "./header";

interface AppLayoutProps {
  children: ReactNode;
  headerProps?: HeaderProps;
  showHeader?: boolean;
  insetTop?: boolean;
  statusBarStyle?: StatusBarStyle;
}

const AppLayout = ({ headerProps, showHeader, statusBarStyle = 'light', insetTop = true, children }: AppLayoutProps) => {
  const insets = useSafeAreaInsets();

  
  return (
    <View className="flex-1 bg-black" style={{ paddingTop: insetTop ? insets.top : 0 }}>
      {showHeader && <Header {...headerProps} />}
      <StatusBar style={statusBarStyle} />
      {children}
    </View>
  );
};

export default AppLayout;
