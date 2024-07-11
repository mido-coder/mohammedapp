import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from "./firebase/firebase"; 

function Ahla({ navigation }) {

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate('A'); // توجيه المستخدم إلى صفحة الدخول بعد تسجيل الخروج
    } catch (error) {
      console.error('Sign Out Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>مرحباً بك في تطبيق الترحيب</Text>
      <Text style={styles.subtitle}>أنت الآن مسجل دخول بنجاح!</Text>
      <Button
        title="تسجيل الخروج"
        onPress={handleSignOut}
      />
    </View>
  );
}

export default Ahla;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
    color: '#333',
  },
});
