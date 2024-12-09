import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native';

const TermsOfUse = () => {
 
    const handleGoBack = () => {
       router.push('/(routes)/signup')
    };
  
   
  const termsData = [
    {
      id: '1',
      title: 'Introduction',
      content:
        'Welcome to COMESO! By using our platform, you agree to these Terms and Conditions. Please read them carefully.',
    },
    {
      id: '2',
      title: 'Use of the Platform',
      points: [
        { id: '2.1', label: 'Eligibility', content: 'You must be at least 18 years old to use COMESO.' },
        {
          id: '2.2',
          label: 'Account',
          content:
            'You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.',
        },
        {
          id: '2.3',
          label: 'Activities',
          content:
            'You agree not to misuse the platform, including but not limited to posting unlawful content, engaging in fraudulent activities, or violating intellectual property rights.',
        },
      ],
    },
    {
      id: '4',
      title: 'Termination',
      content:
        'We reserve the right to suspend or terminate your account at our discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users.',
    },
    {
      id: '5',
      title: 'Changes to Terms',
      content:
        'We may update these Terms from time to time. Continued use of the platform after changes constitute acceptance of the new Terms.',
    },
    {
      id: '6',
      title: 'Contact Us',
      content: 'For any questions or concerns about these Terms, please contact us at help@comeso.com',
    },
  ];

  const RenderItem = (item) => (
    <View style={styles.sectionContainer} key={item.id}>
      <Text style={styles.sectionTitle}>
        {item.id}. {item.title}
      </Text>
      {item.points ? (
        item.points.map((point) => (
          <View style={styles.pointContainer} key={point.id}>
            <Text style={styles.pointLabel}>{point.label}:</Text>
            <Text style={styles.pointContent}>{point.content}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.content}>{item.content}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Terms & Conditions</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}>
        {termsData.map((term) => RenderItem(term))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginBottom: "10%",

    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#f7f7f7',
    
  },
  backButton: {},
  headerText: {
    fontSize: 20,
    fontFamily: 'SofiaPro',
    fontWeight: 'bold',
    margin:"auto",
   },
  scrollContainer: {
    flexGrow: 1,  
    marginBottom: "30%",

    backgroundColor: '#f5f5f5', 
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'SofiaPro',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SofiaPro',
  },
  pointContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  pointLabel: {
    fontWeight: 'bold',
    marginRight: 8,
    fontFamily: 'SofiaPro',
  },
  pointContent: {
    flex: 1,
    fontSize: 16,
  },
});

export default TermsOfUse;
