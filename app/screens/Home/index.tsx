import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fontFamilies} from '../../constants/fonts';

const Home = () => {
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
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Click Me!</Text>
          <AntDesign name="rightcircle" size={24} color="black" />
        </TouchableOpacity>

        {/* List Items */}
        {[1, 2, 3].map(item => (
          <View key={item} style={styles.listItem}>
            <Text style={styles.listItemText}>List Item {item}</Text>
          </View>
        ))}
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
  },
  buttonText: {
    // color: 'white',
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
});

export default Home;
