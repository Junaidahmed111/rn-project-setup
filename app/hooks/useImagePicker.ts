import {useState} from 'react';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Platform, PermissionsAndroid, Alert} from 'react-native';

export const useImagePicker = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickFromGallery = async () => {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        selectionLimit: 1,
        quality: 0.7,
      });
      if (
        !response.didCancel &&
        response.assets &&
        response.assets.length > 0
      ) {
        const selectedImage = response.assets[0].uri;
        setImageUri(selectedImage!);
        return selectedImage;
      }
    } catch (error) {
      console.error('Error picking image from gallery:', error);
    }
    return null;
  };

  const pickFromCamera = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Camera permission denied');
          return null;
        }
      }
      console.log('Opening camera...');
      const response = await launchCamera({
        mediaType: 'photo',
        includeBase64: false,
        quality: 0.7,
        saveToPhotos: true,
      });
      if (
        !response.didCancel &&
        response.assets &&
        response.assets.length > 0
      ) {
        const selectedImage = response.assets[0].uri;
        setImageUri(selectedImage!);
        return selectedImage;
      }
    } catch (error) {
      console.error('Error picking image from camera:', error);
    }
    return null;
  };

  return {imageUri, setImageUri, pickFromGallery, pickFromCamera};
};
