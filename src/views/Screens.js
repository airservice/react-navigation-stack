import { createScreenComponents } from 'react-native-screens';
import { createAnimatedComponent } from 'react-native-reanimated';

const { Screen, ScreenContainer } = createScreenComponents(createAnimatedComponent);
export {
  Screen,
  ScreenContainer,
};