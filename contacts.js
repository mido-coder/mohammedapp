import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Alert, Button } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from './firebase/firebase';
import { signOut } from 'firebase/auth';

const Contacts = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        let queryRef = query(usersRef);

        // إذا كان هناك قيمة بحث، قم بتصفية البيانات المسترجعة
        if (search !== '') {
          queryRef = query(usersRef,
            where('username', '>=', search),
            where('username', '<=', search + '\uf8ff') // '\uf8ff' هو Unicode الأخير
          );
        }

        const querySnapshot = await getDocs(queryRef);
        const usersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersList);
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [search]); // تأكد من أن useEffect يعيد تشغيله عندما يتغير البحث

  useEffect(() => {
    // استعلام للحصول على معلومات المستخدم الحالي
    // هنا يجب استخدام طريقة للحصول على اسم المستخدم مثل auth.currentUser أو تخزينه بالفعل في جلسة
    if (auth.currentUser) {
      setUsername(auth.currentUser.displayName || auth.currentUser.email); // استبدل هذا بالطريقة المناسبة للحصول على اسم المستخدم
    }
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Alert.alert('DECONEXION', 'SEE U LATER .');
        navigation.navigate('A'); // توجيه المستخدم إلى شاشة تسجيل الدخول بعد تسجيل الخروج
      })
      .catch((error) => {
        Alert.alert('Logout Failed', error.message);
      });
  };

  const handleAddContact = () => {
    // تنفيذ إجراء إضافة جهة اتصال جديدة
    // يمكنك هنا إضافة رمز لفتح شاشة أو فعل أي عملية إضافة
    Alert.alert('Add Contact', 'Implement add contact functionality here.');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Welcome, {username}</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Search by name..."
        onChangeText={text => setSearch(text)}
        value={search}
      />
      <Text style={styles.header}>Registered Users</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.name}>Name: {item.username}</Text>
            <Text style={styles.phone}>Phone: {item.phone}</Text>
          </View>
        )}
      />
      <Button
        title="Add Contact"
        onPress={handleAddContact}
        style={styles.addButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    marginTop: 10,
  },
});

export default Contacts;
