import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationService from './navigationService';
import {useSelector} from 'react-redux';
// import Walkthrough from './Screens/Walkthrough';
import LoginScreen from './Screens/LoginScreen';
import Color from './Assets/Utilities/Color';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import Color from './Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import { MaskedViewIOS, View } from 'react-native';
import Signup from './Screens/Signup';
import Homescreen from './Screens/Homescreen';
import Wishlist from './Screens/Wishlist';
import store from './Screens/store';
import Settings from './Screens/Settings';
import Store from './Screens/store';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import BarberServicesScreen from './Screens/BarberServicesScreen';
import ChooseDate from './Screens/ChooseDate';
import CheckoutScreen from './Screens/CheckoutScreen';
import PaymentScreen from './Screens/PaymentScreen';


const AppNavigator = () => {
  // const isLogin = false;
  const isGoalCreated = useSelector(state => state.authReducer.isGoalCreated);

  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const isVerified = useSelector(state => state.authReducer.isVerified);
  const token = useSelector(state => state.authReducer.token);
  // console.log('token>>>>', token);
  // console.log('isVerified', isGoalCreated);
 console.log(token);

  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();

  const AppNavigatorContainer = () => {
    const firstScreen =
    //   walkThrough == false
    //     ? 'Walkthrough'
        // :
       
        token != null 
        ? 'TabNavigation'
        : 'LoginScreen';

    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={firstScreen}
          screenOptions={{headerShown: false}}>
          {/* <RootNav.Screen name="Walkthrough" component={Walkthrough} /> */}
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen name="Homescreen" component={Homescreen} />

          <RootNav.Screen name="Signup" component={Signup} />
          <RootNav.Screen name="BarberServicesScreen" component={BarberServicesScreen} />
          <RootNav.Screen name="ChooseDate" component={ChooseDate} />
          <RootNav.Screen name="TabNavigation" component={TabNavigation} />
          <RootNav.Screen name="CheckoutScreen" component={CheckoutScreen} />
          <RootNav.Screen name="PaymentScreen" component={PaymentScreen} />




        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};

export const TabNavigation = (props) => {
  const Tabs = createBottomTabNavigator();
  return (

    <Tabs.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle :{
          backgroundColor: 'rgba(34,36,40,1)',
        },
        tabBarIcon: ({focused}) => {
          let iconName;
          let color = Color.themeColor;
          let size = moderateScale(20, 0.3);
          let type = Ionicons ;

          if (route.name === 'HomeScreen') {
            iconName = focused ? 'home' : 'home-outline';
            color = focused ? Color.themeColor : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          }
           else if (route.name === 'Wishlist') {
            iconName = focused ? 'heart' : 'hearto';
            color = focused ? Color.themeColor : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
            type = AntDesign ;
          } else if (route.name === 'Store') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
            color = focused ? Color.themeColor : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } 
          else if (route.name === 'Settings') {
          
            iconName = focused ? 'settings' : 'settings-outline';

            color = focused ? Color.themeColor : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          }
        
          return (
            <MaskedView
            style={{flexDirection: 'row', height: size }}
            maskElement={
              <View
                style={{
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                name={iconName} as={type} color={color} size={size} 
                />
              </View>
            }>
            <LinearGradient
              colors={['#C49948', '#EBDBBD' , '#E3C488']}
              style={{ flex: 1 }}
            />
          </MaskedView>
 
          
            
          )
        },
        tabBarShowLabel: false,
      })}>
      <Tabs.Screen name={'HomeScreen'} component={Homescreen} />
      <Tabs.Screen name={'Wishlist'} component={Wishlist} />
      <Tabs.Screen name={'Store'} component={Store} />
      <Tabs.Screen name={'Settings'} component={Settings} />


    </Tabs.Navigator>
  );
};

export default AppNavigator;