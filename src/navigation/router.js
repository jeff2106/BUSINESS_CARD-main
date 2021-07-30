import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AccueilScanne from '../screens/AccueilScanne';
import Inscription from '../screens/inscription/index';
import MaCarte from '../screens/MaCarte';
import ScanneRecent from '../screens/scanneRecent';
import TypeCarte from '../screens/typeCarte';
import AjoutRecent from '../screens/ajoutRecent';
import Profile from '../screens/profile';
import EditProfile from '../screens/editProfile';
import SuccesUpdate from '../screens/editProfile/SuccessUpdate';
import Connexion from '../screens/connexion';
import ScannerCode from '../screens/scannerCode';
import Agendas from '../screens/agendas';
import ResultQrcode from '../screens/resultQrcode';
import WriteAgenda from '../screens/writeAgenda';
const Stack = createStackNavigator();

const Router = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inscription" headerMode="none">
      <Stack.Screen
          name={'Inscription'}
          component={Inscription}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'Connexion'}
          component={Connexion}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'AccueilScanne'}
          component={AccueilScanne}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'MaCarte'}
          component={MaCarte}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'ScanneRecent'}
          component={ScanneRecent}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'TypeCarte'}
          component={TypeCarte}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'AjoutRecent'}
          component={AjoutRecent}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'Profile'}
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'EditProfile'}
          component={EditProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'SuccesUpdate'}
          component={SuccesUpdate}
          options={{
            headerShown: false,
          }}
        />


        <Stack.Screen
          name={'ScannerCode'}
          component={ScannerCode}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'Agendas'}
          component={Agendas}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'ResultQrcode'}
          component={ResultQrcode}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'WriteAgenda'}
          component={WriteAgenda}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
