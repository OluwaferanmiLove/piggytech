import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from 'src/@types/navigation';

type RouteName = keyof RootStackParamList;

function useRouteParams<T extends RouteName>() {
  const route = useRoute<RouteProp<RootStackParamList, T>>();
  return route.params;
}

export default useRouteParams;
