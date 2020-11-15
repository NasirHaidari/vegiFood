import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Context = React.createContext('default Value')


// import MyStack from './navigator/PlaceNavigator';


import newPlaceForm from './screens/newPlaceForm';

// import NewPlaceLocation from './components/NewPlaceLocation'
import PlaceList from './screens/PlaceList';



const Stack = createStackNavigator();







 const App = () => {
  return (
    <Context.Provider>
    <NavigationContainer>
    <Stack.Navigator>
     
      <Stack.Screen name="Profile" component={newPlaceForm} />
      <Stack.Screen name="PlaceList" component={PlaceList} />
    </Stack.Navigator>
 </NavigationContainer>
 </Context.Provider>
);
};
export default App;