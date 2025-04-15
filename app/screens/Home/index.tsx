import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  StatusBar,
} from 'react-native';
import {s, vs, ms} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fontFamilies} from '../../constants/fonts';
import FastImage from '@d11/react-native-fast-image';
import {useImagePicker} from '../../hooks/useImagePicker';
import {useDispatch, useSelector} from 'react-redux';
import {setIsDarkTheme} from '../../store/slice/themeSlice';
import {RootState} from '../../store/slice';
import {useTheme, Switch} from 'react-native-paper';

const Home = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = useTheme();
  const styles = useStyle();
  const {imageUri, setImageUri, pickFromGallery, pickFromCamera} =
    useImagePicker();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleTheme = () => {
    dispatch(setIsDarkTheme(!isDark));
  };

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Theme Switch */}
        <View style={styles.themeSwitch}>
          <Text style={styles.themeSwitchText}>Dark Mode</Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            color={theme.colors.primary}
          />
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={[styles.welcomeText]}>Welcome Back 👋</Text>
          <Text style={[styles.nameText, {color: theme.colors.text}]}>
            John Doe
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View
            style={[styles.statCard, {backgroundColor: theme.colors.surface}]}>
            <AntDesign
              name="camera"
              size={s(24)}
              color={theme.colors.primary}
            />
            <Text style={[styles.statNumber, {color: theme.colors.text}]}>
              24
            </Text>
            <Text style={[styles.statLabel, {color: theme.colors.subText}]}>
              Photos
            </Text>
          </View>
          <View
            style={[styles.statCard, {backgroundColor: theme.colors.surface}]}>
            <AntDesign name="heart" size={s(24)} color={theme.colors.primary} />
            <Text style={[styles.statNumber, {color: theme.colors.text}]}>
              156
            </Text>
            <Text style={[styles.statLabel, {color: theme.colors.subText}]}>
              Likes
            </Text>
          </View>
        </View>

        {/* Recent Activity Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>
              Share your moments with the world! Upload a new photo to your
              collection.
            </Text>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => setModalVisible(true)}>
              <AntDesign name="plus" size={s(24)} color="white" />
              <Text style={styles.uploadButtonText}>Upload Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Display Selected Image */}
        {imageUri && (
          <View style={styles.selectedImageContainer}>
            <Text style={styles.sectionTitle}>Selected Photo</Text>
            <View style={styles.imageWrapper}>
              <FastImage
                source={{uri: imageUri}}
                style={styles.selectedImage}
                resizeMode="cover"
              />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Image Picker Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Photo</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={async () => {
                setModalVisible(false);
                const image = await pickFromCamera();
                if (image) setImageUri(image);
              }}>
              <AntDesign name="camera" size={s(24)} color="#007AFF" />
              <Text style={styles.modalButtonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={async () => {
                setModalVisible(false);
                const image = await pickFromGallery();
                if (image) setImageUri(image);
              }}>
              <AntDesign name="picture" size={s(24)} color="#007AFF" />
              <Text style={styles.modalButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const useStyle = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      padding: s(20),
    },
    heroSection: {
      marginBottom: vs(30),
    },
    welcomeText: {
      fontSize: ms(16),
      color: theme.colors.subText,
      fontFamily: fontFamilies.MONTSERRAT.medium,
    },
    nameText: {
      fontSize: ms(32),
      color: theme.colors.text,
      fontFamily: fontFamilies.MONTSERRAT.bold,
      marginTop: vs(4),
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: vs(30),
    },
    statCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: s(16),
      padding: s(20),
      width: '47%',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: s(2)},
      shadowOpacity: 0.05,
      shadowRadius: s(15),
      elevation: 2,
    },
    statNumber: {
      fontSize: s(24),
      fontFamily: fontFamilies.MONTSERRAT.bold,
      color: '#1a1a1a',
      marginTop: vs(12),
    },
    statLabel: {
      fontSize: s(14),
      fontFamily: fontFamilies.MONTSERRAT.medium,
      color: '#666',
      marginTop: vs(4),
    },
    sectionContainer: {
      marginBottom: vs(30),
    },
    sectionTitle: {
      fontSize: s(20),
      fontFamily: fontFamilies.MONTSERRAT.bold,
      color: '#1a1a1a',
      marginBottom: vs(16),
    },
    activityCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: s(16),
      padding: s(20),
      shadowColor: '#000',
      shadowOffset: {width: 0, height: s(2)},
      shadowOpacity: 0.05,
      shadowRadius: s(15),
      elevation: 2,
    },
    activityText: {
      fontSize: s(14),
      fontFamily: fontFamilies.MONTSERRAT.medium,
      color: '#666',
      lineHeight: vs(22),
      marginBottom: vs(20),
    },
    uploadButton: {
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: s(16),
      borderRadius: s(12),
      gap: s(8),
    },
    uploadButtonText: {
      color: 'white',
      fontSize: s(16),
      fontFamily: fontFamilies.MONTSERRAT.medium,
    },
    selectedImageContainer: {
      marginBottom: vs(30),
    },
    imageWrapper: {
      borderRadius: s(16),
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: s(2)},
      shadowOpacity: 0.05,
      shadowRadius: s(15),
      elevation: 2,
    },
    selectedImage: {
      width: '100%',
      height: vs(200),
      backgroundColor: '#f0f0f0',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: s(24),
      borderTopRightRadius: s(24),
      padding: s(24),
      paddingBottom: vs(40),
    },
    modalTitle: {
      fontSize: s(20),
      fontFamily: fontFamilies.MONTSERRAT.bold,
      color: '#1a1a1a',
      marginBottom: vs(20),
      textAlign: 'center',
    },
    modalButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: s(16),
      backgroundColor: '#f8f9fa',
      borderRadius: s(12),
      marginBottom: vs(12),
    },
    modalButtonText: {
      fontSize: s(16),
      fontFamily: fontFamilies.MONTSERRAT.medium,
      color: '#1a1a1a',
      marginLeft: s(12),
    },
    themeSwitch: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: vs(10),
      marginBottom: vs(20),
    },
    themeSwitchText: {
      fontSize: ms(16),
      fontFamily: fontFamilies.MONTSERRAT.medium,
      color: theme.colors.text,
    },
  });
};

export default Home;
