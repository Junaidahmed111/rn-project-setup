import {isIOS} from '../utils/isIOS';

export const fontFamilies = {
  MONTSERRAT: {
    normal: isIOS ? 'Montserrat-Regular' : 'MontserratRegular',
    medium: isIOS ? 'Montserrat-Medium' : 'MontserratMedium',
    bold: isIOS ? 'Montserrat-Bold' : 'MontserratBold',
    thin: isIOS ? 'Montserrat-Thin' : 'MontserratThin',
  },
};
