import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import newPlaceForm from '../screens/newPlaceForm'
import PlaceList from '../screens/PlaceList'
import NewPlaceLocation from '../components/NewPlaceLocation'


const Stack = createStackNavigator();



const MyStack = () => {
  return (
    
      <Stack.Navigator>
        <Stack.Screen
         
        />
        <Stack.Screen name="Profile" component={newPlaceForm} />
        <Stack.Screen name="PlaceList" component={PlaceList} />
      </Stack.Navigator>
   
  );
};

export default MyStack