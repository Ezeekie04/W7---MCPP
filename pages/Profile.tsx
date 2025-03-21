import React, { useEffect, useRef } from "react";
import { Button, Text, View, Image, Animated } from "react-native";
import styles from "../Styles.js";

const imageMapping = {
  jokowi: require("../assets/foto4.jpg"),
  ardi: require("../assets/foto2.jpg"),
  lumbaLumbaSunda: require("../assets/foto3.jpg"),
  rogerSumatera: require("../assets/foto4.jpg"),
  ilhamPerkakas: require("../assets/foto1.jpg"),
  rudiBanSerep: require("../assets/foto5.jpg"),
  mangKodir: require("../assets/foto3.jpg"),
};

const Profile = ({ route, navigation }) => {
  const { user } = route.params;
  const userImage = imageMapping[user.name] || require("../assets/foto1.jpg");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current; 

  const randomDuration = Math.floor(Math.random() * 400) + 400;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: randomDuration,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: randomDuration,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.profileContainer, { opacity: fadeAnim }]}>
      <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
        <Image source={userImage} style={styles.profileImage} />
        <Text style={styles.profileName}>{user.name}'s Profile</Text>
        <Text style={styles.profileEmail}>{user.email}</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </Animated.View>
    </Animated.View>
  );
};

export default Profile;
