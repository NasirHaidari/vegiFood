import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack'


import newPlaceForm from '../components/newPlaceForm'
import PlaceList from '../components/PlaceList'



const Stack = createStackNavigator();

const StackScreen = () => (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen component={newPlaceForm}/>
      
    </Stack.Navigator>
   </NavigationContainer>
)
