import React from "react";
import { ImageBackground, View } from "react-native";
import * as Animatable from "react-native-animatable";
import Color from "../Assets/Utilities/Color";
import CustomStatusBar from "../Components/CustomStatusBar";
import CustomText from "../Components/CustomText";
import CustomImage from "../Components/CustomImage";
import { windowHeight, windowWidth } from "../Utillity/utils";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import ScreenBoiler from "../Components/ScreenBoiler";
import LinearGradient from "react-native-linear-gradient";

const SplashScreen = () => {
  const backgroundImage = require("../Assets/Images/appLogo.png");
  return (
    <ScreenBoiler
     
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={"light-content"}
    >
     <LinearGradient 
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
      colors={Color.themeGradient}
     style={styles.container}>
     
      
          <Animatable.Image
            animation="fadeInDown"
            duration={2500}
            useNativeDriver
            source={backgroundImage}
            resizeMode={"contain"}
            style={[styles.bottomImage]}
            onAnimationEnd={() => {
              console.log("hello");
            }}
          />
         <View style={{
            // backgroundColor : 'red',
            // height : 20,
            // width : 20,
            position : 'absolute',
            bottom : 0,
            right : 0
          }}>

         
            <CustomImage
            source={require('../Assets/Images/backgroundLogo.png')}
            resizeMode={'stretch'}
            style={{
            //   flexGrow : 0 ,
            //   position : 'absolute',
            //   bottom : moderateScale(0,0.3) ,
            //   right : 1,
            //   zIndex : 1,
              // left : 0,
            //   top : moderateScale(50,0.3),
              // backgroundColor : 'red'
            }}
            />
             </View>
      </LinearGradient>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    justifyContent: "center",
    height: windowHeight,
    width: windowWidth,
    // backgroundColor : Color.green
  },
  bottomImage: {
    width : windowWidth * 0.65,
    alignSelf :'center',
    // backgroundColor : 'red'
  },
  textContainer: {
    flexDirection: "row",
   
    width : windowWidth * 0.7,
    height :windowWidth * 0.7,
    borderRadius : moderateScale(windowWidth* 0.7 / 2 , 0.3),
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : Color.white,
    

  },
  LogoText: {
    fontSize: moderateScale(35, 0.3),
    fontWeight: "bold",
  },
 
});

export default SplashScreen;
