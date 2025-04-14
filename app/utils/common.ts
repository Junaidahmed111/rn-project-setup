import {Platform} from 'react-native';
export const getTopHeight = (screen, insets) => {
  if (screen == 'test') return 0;
  else if (Platform.OS == 'android') return 8;
  else if (insets.top > 43 && insets.top < 46) return 35;
  else if (insets.top > 46) {
    if (insets.top == 47) return 50;
    else return 51;
  } else return 20;
};
