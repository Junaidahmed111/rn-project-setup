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
import {useTranslation} from 'react-i18next';
const Home = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = useTheme();
  const styles = useStyle();
  const {t, i18n} = useTranslation();
  const {imageUri, setImageUri, pickFromGallery, pickFromCamera} =
    useImagePicker();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleTheme = () => {
    dispatch(setIsDarkTheme(!isDark));
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Controls */}
        <View style={styles.headerControls}>
          <View style={styles.themeSwitch}>
            <Text style={styles.themeSwitchText}>{t('home.darkMode')}</Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              color={theme.colors.primary}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.languageButton,
              {backgroundColor: theme.colors.primary},
            ]}
            onPress={toggleLanguage}>
            <Text style={styles.languageButtonText}>
              {i18n.language.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={[styles.welcomeText]}>{t('home.welcome')}</Text>
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
              {t('home.stats.photoCount')}
            </Text>
            <Text style={[styles.statLabel, {color: theme.colors.subText}]}>
              {t('home.stats.photos')}
            </Text>
          </View>
          <View
            style={[styles.statCard, {backgroundColor: theme.colors.surface}]}>
            <AntDesign name="heart" size={s(24)} color={theme.colors.primary} />
            <Text style={[styles.statNumber, {color: theme.colors.text}]}>
              {t('home.stats.likeCount')}
            </Text>
            <Text style={[styles.statLabel, {color: theme.colors.subText}]}>
              {t('home.stats.likes')}
            </Text>
          </View>
        </View>

        {/* Recent Activity Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('home.activity.title')}</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>
              {t('home.activity.description')}
            </Text>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => setModalVisible(true)}>
              <AntDesign name="plus" size={s(24)} color="white" />
              <Text style={styles.uploadButtonText}>
                {t('home.activity.uploadPhoto')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Display Selected Image */}
        {imageUri && (
          <View style={styles.selectedImageContainer}>
            <Text style={styles.sectionTitle}>{t('home.selectedPhoto')}</Text>
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
            <Text style={styles.modalTitle}>{t('home.imageModal.title')}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={async () => {
                setModalVisible(false);
                const image = await pickFromCamera();
                if (image) setImageUri(image);
              }}>
              <AntDesign
                name="camera"
                size={s(24)}
                color={theme.colors.primary}
              />
              <Text style={styles.modalButtonText}>
                {t('home.imageModal.takePhoto')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={async () => {
                setModalVisible(false);
                const image = await pickFromGallery();
                if (image) setImageUri(image);
              }}>
              <AntDesign
                name="picture"
                size={s(24)}
                color={theme.colors.primary}
              />
              <Text style={styles.modalButtonText}>
                {t('home.imageModal.chooseFromGallery')}
              </Text>
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
    headerControls: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: vs(20),
    },
    themeSwitch: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: vs(10),
      marginRight: s(10),
    },
    themeSwitchText: {
      fontSize: ms(16),
      fontFamily: fontFamilies.MONTSERRAT.medium,
      color: theme.colors.text,
    },
    languageButton: {
      paddingHorizontal: s(16),
      paddingVertical: vs(8),
      borderRadius: s(8),
      justifyContent: 'center',
      alignItems: 'center',
    },
    languageButtonText: {
      color: 'white',
      fontSize: ms(14),
      fontFamily: fontFamilies.MONTSERRAT.medium,
    },
  });
};

export default Home;
