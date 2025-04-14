import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fontFamilies} from '../../constants/fonts';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import FastImage from '@d11/react-native-fast-image';

const Home = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleSelectImage = async () => {
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
        console.log('Selected image URI:', selectedImage);
        setImageUri(selectedImage);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome Home</Text>
          <Text style={styles.headerSubtitle}>Good Morning, User!</Text>
        </View>

        {/* Card Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Featured Content</Text>
          <Text style={styles.cardText}>
            This is a sample card with some dummy content. You can customize it
            based on your needs.
          </Text>
        </View>

        {/* Button Section */}
        <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
          <Text style={styles.buttonText}>Select Image</Text>
          <AntDesign name="rightcircle" size={24} color="white" />
        </TouchableOpacity>

        {imageUri && (
          <View style={styles.imageContainer}>
            <FastImage
              source={{uri: imageUri}}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
    fontFamily: fontFamilies.MONTSERRAT.bold,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    fontFamily: fontFamilies.MONTSERRAT.thin,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: fontFamilies.MONTSERRAT.medium,
  },
  listItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 16,
    color: '#333',
  },
  imageContainer: {
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: Dimensions.get('window').width - 32,
    height: 200,
    backgroundColor: '#f0f0f0',
  },
});

export default Home;
