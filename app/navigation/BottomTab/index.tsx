import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from '@d11/react-native-fast-image';
import icons from '../../utils/icons';
import {useBottomTabNav} from './useBottomTabNav';

export default function BottomTab() {
  const {focusedId} = useBottomTabNav();

  const navigation = useNavigation();
  const goTo = name => () => navigation.navigate(name);
  const blackList = ['-'];
  const bottomButtonsList = [
    {
      title: 'Home',
      routeName: 'Home',
      icon: icons.homeIcon,
      onPress: goTo('Home'),
    },
    {
      title: 'Contact Us',
      routeName: 'ContactUs',
      icon: icons.contactUsIcon,
      onPress: goTo('ContactUs'),
    },
  ];

  const renderButton = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.subcontainer,
          {width: `${100 / bottomButtonsList.length}%`},
        ]}
        onPress={item?.onPress}>
        <FastImage
          source={item?.icon}
          //   defaultSource={require('../../assets/icons/homeIcon.png')}
          style={styles.iconStyle}
          //   tintColor={
          //     focusedId == item?.routeName
          //       ? theme.colors.focused
          //       : theme.colors.heading
          //   }
          resizeMode={FastImage.resizeMode.contain}
        />
        {focusedId == item?.routeName ? (
          <Text style={styles.focusedTitle}>{item?.title}</Text>
        ) : (
          <Text
            style={[
              // focusedId == item?.routeName
              //   ? styles.focusedTitle
              //   :
              styles.defaultTitle,
            ]}>
            {item?.title}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  if (blackList.includes(focusedId)) return <></>;
  return (
    <View style={styles.container}>{bottomButtonsList.map(renderButton)}</View>
    // <View style={{flex: 1, backgroundColor: 'yellow'}}>
    //   <Text>Hello</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    elevation: 10,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    paddingHorizontal: 21,
    paddingTop: 12,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: -2},
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  subcontainer: {
    alignItems: 'center',
    padding: 3,
  },
  iconStyle: {
    height: 24,
    width: 24,
    marginBottom: 4,
  },
  defaultTitle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
  focusedTitle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000',
    fontWeight: '500',
  },
});
