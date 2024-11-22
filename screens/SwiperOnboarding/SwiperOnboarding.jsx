import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { router } from "expo-router"; // Assuming you're using expo-router for navigation
import { commonstyles } from "@/styles/common/common.style";

export const onboardingSwiperData = [
  {
    id: 1,
    title: "Easy Payments",
    description: "Enjoy seamless payment.",
    sortDescription: "processes",
    sortDescription2: "",
    image: require("@/assets/images/frame1.png"), // Ensure this path is correct for your project setup
  },
  {
    id: 2,
    title: "Easy Payments",
    description: "We guarantee the best",
    sortDescription: "experience on our.",
    sortDescription2: "platform",
    image: require("@/assets/images/Frame2.png"), // Ensure this path is correct for your project setup
  },
  {
    id: 3,
    title: "Track Your Payments",
    description: "Track all transactions",
    sortDescription: "made by you to all your.",
    sortDescription2: "beneficiaries",
    image: require("@/assets/images/Frame3.png"), // Ensure this path is correct for your project setup
  },
];

export default function WelcomeIntroScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      </View>

      {/* Text Section */}
      <View style={styles.textContainer}>
        <Text style={[commonstyles.title, { fontFamily: "Raleway_700Bold" }]}>
          {item.title}
        </Text>
        <Text style={[commonstyles.description, { fontFamily: "Nunito_400Regular" }]}>
          {item.description}
        </Text>
        <Text style={[commonstyles.description, { fontFamily: "Nunito_400Regular" }]}>
          {item.sortDescription}
        </Text>
        {item.sortDescription2 && (
          <Text style={[commonstyles.description, { fontFamily: "Nunito_400Regular" }]}>
            {item.sortDescription2}
          </Text>
        )}
      </View>

      {/* Button Section */}
      <TouchableOpacity
        onPress={() => router.push("/(routes)/onboarding-section")}
        style={[commonstyles.buttonWrapper, { top: "-7.5%" }]}
      >
        <Text style={[commonstyles.buttonText, { fontFamily: "Nunito_700Bold" }]}>
          Getting Started
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={onboardingSwiperData}
      renderNextButton={() => (
        <View style={commonstyles.welcomeButton}>
          <Text style={[{ fontFamily: "Nunito_700Bold" }]}>Next</Text>
        </View>
      )}
      renderDoneButton={() => (
        <View style={commonstyles.welcomeButton}>
          <Text style={[{ fontFamily: "Nunito_700Bold" }]}>Done</Text>
        </View>
      )}
      showSkipButton={false}
      bottomButton={false}
      dotStyle={commonstyles.dotStyle}
      activeDotStyle={commonstyles.activeDotStyle}
      renderPagination={(activeIndex) => (
        <View style={commonstyles.paginationContainer}>
          {onboardingSwiperData.map((_, index) => (
            <View
              key={index}
              style={[
                commonstyles.paginationDot,
                activeIndex === index && commonstyles.activePaginationDot,
              ]}
            />
          ))}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});