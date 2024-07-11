import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Image, Text } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase/firebase";

function A({ navigation }) {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    if (isLogin) {
      if (emailOrUsername.includes('@')) {
        // تسجيل الدخول باستخدام البريد الإلكتروني وكلمة المرور
        signInWithEmailAndPassword(auth, emailOrUsername, password)
          .then((userCredential) => {
            // تسجيل الدخول بنجاح
            const user = userCredential.user;
            Alert.alert('Login Successful', `Welcome back, ${user.email}!`);
            navigation.navigate('Contacts'); // التوجيه إلى صفحة الترحيب بعد تسجيل الدخول
          })
          .catch((error) => {
            // حدث خطأ أثناء تسجيل الدخول
            const errorMessage = error.message;
            Alert.alert('Login Failed', errorMessage);
          });
      } else {
        // تسجيل الدخول باستخدام اسم المستخدم وكلمة المرور
        try {
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("username", "==", emailOrUsername));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data();
            const userEmail = userDoc.email;

            signInWithEmailAndPassword(auth, userEmail, password)
              .then((userCredential) => {
                // تسجيل الدخول بنجاح
                const user = userCredential.user;
                Alert.alert('Login Successful', `Welcome back, ${user.email}!`);
                navigation.navigate('Contacts'); // التوجيه إلى صفحة الترحيب بعد تسجيل الدخول
              })
              .catch((error) => {
                // حدث خطأ أثناء تسجيل الدخول
                const errorMessage = error.message;
                Alert.alert('Login Failed', errorMessage);
              });
          } else {
            Alert.alert('Login Failed', 'No user found with that username.');
          }
        } catch (error) {
          Alert.alert('Login Failed', error.message);
        }
      }
    } else {
      // التحقق من إدخال اسم المستخدم ورقم الهاتف
      if (!username || !phone) {
        Alert.alert('Sign Up Failed', 'Username and Phone number are required.');
        return;
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // إنشاء حساب جديد بنجاح
          const user = userCredential.user;

          // إضافة المستخدم إلى قاعدة بيانات Firestore مع البيانات الإضافية
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            uid: user.uid,
            username: username,
            phone: phone,
          });

          Alert.alert('Signup Successful', `Welcome, ${user.email}!`);
          navigation.navigate('Contacts'); // التوجيه إلى صفحة الترحيب بعد إنشاء الحساب
        })
        .catch((error) => {
          // حدث خطأ أثناء إنشاء الحساب
          const errorMessage = error.message;
          Alert.alert('Signup Failed', errorMessage);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'data:image/jpeg;base64,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' }} // استخدم رابط صورة افتراضية
        style={styles.logo}
      />
      {isLogin ? (
        <TextInput
          style={styles.input}
          placeholder="Email or Username"
          value={emailOrUsername}
          onChangeText={setEmailOrUsername}
        />
      ) : (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title={isLogin ? 'Login' : 'Sign Up'} onPress={handleAuth} />
      <Button
        title={isLogin ? 'Create an account' : 'Already have an account? Login'}
        onPress={() => setIsLogin(!isLogin)}
      />
      <View style={styles.footer}>
        <Text>mohamed lamine boualleg</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: '90%', // تحديث العرض ليكون ثابتًا
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default A;
