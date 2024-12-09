import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Privacies = () => {

    const handleGoBack = () => {
        router.push('/(routes)/signup')
     };
  const termsData = [
    {
      id: '1',
      title: 'Introduction',
      content:
        'COMESO values your privacy. This Privacy Policy explains how we collect, use, and protect your information.',
    },
    {
      id: '2',
      title: 'Information We Collect',
      points: [
        {
          id: '2.1',
          label: 'Personal Information',
          content: 'When you create an account, we collect information such as your name, email address, and phone number.',
        },
        {
          id: '2.2',
          label: 'Transaction Information',
          content: 'Details of the items you list, swap, or purchase.',
        },
        {
          id: '2.3',
          label: 'Usage Data',
          content: 'Information about how you interact with our platform, such as pages visited and features used.',
        },
      ],
    },
    {
      id: '3',
      title: 'How We Use Your Information',
      points: [
        {
          id: '3.1',
          label: 'Provide Services',
          content: 'To facilitate item listings, swaps, and transactions.',
        },
        {
          id: '3.2',
          label: 'Communication',
          content: 'To send you updates, notifications, and support messages.',
        },
        {
          id: '3.3',
          label: 'Improvement',
          content: 'To analyze usage and improve our platform.',
        },
      ],
    },
    {
        id: '4',
        title: 'Sharing Your Information',
        points: [
          { id: '4.1', label: 'With Other Users', content: 'Limited information is shared with other users to facilitate transactions.' },
          {
            id: '4.2',
            label: 'Service Providers',
            content: 'We may share information with third-party service providers to help us operate our business',
          },
          {
            id: '4.3',
            label: 'Legal Requirements',
            content: 'We may disclose your information to comply with legal obligations',
          },
        ],
      },
      {
        id: '5',
        title: 'Security',
        content:
          'We implement appropriate security measures to protect your information from unauthorized access and use.',
      },

      {
        id: '6',
        title: 'Data Retention',
        content:
          'We retain your information for as long as necessary to provide our services and comply with legal obligations.',
      },
   ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Privacy Policy</Text>
      </View>
      <ScrollView style={styles.contentContainer} contentContainerStyle={styles.scrollContent}>
        {termsData.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.title}>
              {section.id}. {section.title}
            </Text>
            {section.points ? (
              <View style={styles.pointsList}>
                {section.points.map((point) => (
                  <View key={point.id} style={styles.pointItem}>
                    <Text>
                      <Text style={styles.pointLabel}>{point.label}: </Text>
                      {point.content}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.content}>{section.content}</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#fff',
    

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#f7f7f7',
 
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    
    fontSize: 16,
    color: '#007BFF',
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'SofiaPro',
    fontWeight: 'bold',
    margin:"auto",
     fontSize: 24,
    fontWeight: 'bold',
  },
  contentContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 20,
    
  },
  
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pointsList: {
    marginLeft: 10,
  },
  pointItem: {
    marginBottom: 10,
  },
  pointLabel: {
    fontWeight: 'bold',
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    
  },
});

export default Privacies;
