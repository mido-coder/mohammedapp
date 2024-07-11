import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import A from './A';
import Contacts from './contacts';
import Ahla from './ahla';
import UsersScreen from './UsersScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
   
    <NavigationContainer>
    <Stack.Navigator initialRouteName="A">
      <Stack.Screen name="A" component={A} />
            <Stack.Screen name="Contacts" component={Contacts} />
            <Stack.Screen name=" UsersScreen" component={ UsersScreen} />
            <Stack.Screen name="Ahla" component={Ahla} />
    </Stack.Navigator>
  </NavigationContainer>
 
  
  
  
  

   


  );
}




