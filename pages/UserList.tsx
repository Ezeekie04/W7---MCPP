import { ScrollView, Animated } from "react-native";
import userData from "../data.json"; // Import data dari JSON
import styles from "../Styles.js";
import React, { useEffect, useRef } from "react";
import { Avatar, Card, Divider } from "react-native-paper";

const UserList = ({ navigation }) => {
  const fadeAnimations = useRef(userData.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    fadeAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 500, // Durasi animasi fade-in
        delay: index * 200, // Setiap item muncul dengan jeda 200ms
        useNativeDriver: true,
      }).start();
    });
  }, []);

  return (
    <ScrollView>
      {userData.map((user, index) => (
        <Animated.View key={user.name} style={{ opacity: fadeAnimations[index] }}>
          <Card 
            style={styles.card} 
            onPress={() => navigation.navigate("Profile", { user })}
          >
            <Card.Title
              title={user.name}
              subtitle={user.email}
              left={() => (
                <Avatar.Image size={50} source={{ uri: user.photo_url }} />
              )}
            />
          </Card>
          <Divider style={styles.divider} />
        </Animated.View>
      ))}
    </ScrollView>
  );
};

export default UserList;
