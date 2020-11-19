import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Context = React.createContext('default Value')

import HeaderButton from './components/HeaderButton'


// import MyStack from './navigator/PlaceNavigator';


import newPlaceForm from './screens/newPlaceForm';

// import NewPlaceLocation from './components/NewPlaceLocation'
import PlaceList from './screens/PlaceList';

import PlaceListOnMap from './screens/PlaceListOnMap'

const Stack = createStackNavigator();







 const App = () => {
  return (
    <Context.Provider>
    <NavigationContainer >
    <Stack.Navigator  initialRouteName="PlaceListOnMap">
     <Stack.Screen name="PlaceListOnMap" component={PlaceListOnMap} />
      <Stack.Screen name="Add a new place" component={newPlaceForm} />
      <Stack.Screen name="PlaceList" options={{

        headerRight: () => (

          <HeaderButton
            onPress={() => NavigationContainer.navigate('Add a new place')}
            title="Info"
            color="#fff"
          />
          )
      }}  component={PlaceList}/>
      
    </Stack.Navigator>
 </NavigationContainer>
 </Context.Provider>
);
};
export default App;