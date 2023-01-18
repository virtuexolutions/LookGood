import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../Components/CustomButton';
import moment from 'moment/moment';
import CustomTextWithMask from '../Components/CustomTextWithMask';
import { Icon } from 'native-base';
import numeral from 'numeral';
import navigationService from '../navigationService';

const CheckoutScreen = props => {
  const finalData = props?.route?.params?.finalData;
  const [subTotal , setSubTotal] = useState(0)
  console.log(
    '🚀 ~ file: CheckoutScreen.js:22 ~ CheckoutScreen ~ finalData',
    finalData,
  );

  useEffect(() => {
        setSubTotal(0);

    finalData?.services.map((x,index)=>{
        return(
            setSubTotal((prev)=>x?.price+prev)
        )
    })
    
  }, 
  [])
  

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      showUser={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={Color.themeGradient}
        style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: windowHeight * 0.1,
            // paddingTop : moderateScale(20,0.3),
            alignItems: 'center',
          }}
          style={{
            width: windowWidth,
          }}>
          {finalData?.services.map((item, index) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems : 'center',
                  width: windowWidth * 0.9 ,
                }}>
                <Icon
                  name={'check-circle-o'}
                  as={FontAwesome}
                  color={Color.white}
                  size={moderateScale(20, 0.3)}
                  style={{}}
                />
                <View style={styles.container1}>
                    <CustomText style={styles.text1}>{item?.name}</CustomText>
                    <CustomText isBold >{numeral(item?.price).format('$0,0.0')}</CustomText>

                </View>
              </View>
            );
          })}

          <View style={{
            flexDirection : 'row',
            marginTop : moderateScale(20,0.3),
            paddingHorizontal : moderateScale(20,0.3),
            width : windowWidth,
            justifyContent : 'space-between'
          }}>
           <CustomText style={[styles.text1,{color : Color.white}]}>Shipping Cost</CustomText>
                    <CustomText isBold style={
                        {color : Color.white}
                    } >$2.05</CustomText>
          </View>
          <View style={{
            flexDirection : 'row',
            marginTop : moderateScale(15,0.3),
            paddingHorizontal : moderateScale(20,0.3),
            width : windowWidth,
            justifyContent : 'space-between'
          }}>
           <CustomText style={[styles.text1,{color : Color.white}]}>Subtotal</CustomText>
                    <CustomText isBold style={
                        {color : Color.white}
                    } >{numeral(subTotal).format('$0,0.0')}</CustomText>
          </View>
          <View style={styles.underline}/>
          <View style={{
            flexDirection : 'row',
            marginTop : moderateScale(15,0.3),
            paddingHorizontal : moderateScale(20,0.3),
            width : windowWidth,
            justifyContent : 'space-between'
          }}>
           <CustomText style={[styles.text1,{color : Color.white}]}>total</CustomText>
                    <CustomText isBold style={
                        {color : Color.white}
                    } >{numeral(subTotal+2.05).format('$0,0.0')}</CustomText>
          </View>
        </ScrollView>
          <CustomButton
            // borderColor={'white'}
            // borderWidth={1}
            textColor={Color.black}
            onPress={() => {
           navigationService.navigate('PaymentScreen', {
                    finalData : finalData
                });
             
            }}
            width={windowWidth * 0.9}
            height={windowHeight * 0.06}
            text={'Payment'}
            fontSize={moderateScale(14, 0.3)}
            // borderRadius={moderateScale(30, 0.3)}
            textTransform={'uppercase'}
            isGradient={true}
            isBold
            marginBottom={moderateScale(30, 0.3)}
          />
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default CheckoutScreen;

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.06,
    // justifyContent: "center",
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
    // paddingLeft: moderateScale(20, 0.3),
    // backgroundColor : Color.themeColor
  },
  text1: {
    color: Color.black,
    fontSize: moderateScale(14, 0.3),
    // marginTop : moderateScale(10,0.3),
    // lineHeight: moderateScale(32, 0.3),
  },
  container1 : {
    backgroundColor : Color.white,
    width : windowWidth * 0.8 ,
    height : windowHeight * 0.12,
    marginBottom : moderateScale(10,0.3),
    marginLeft : moderateScale(10,0.3),
    paddingLeft : moderateScale(10,0.3),
    paddingTop : moderateScale(20,0.3)
  },
  underline : {
    width : windowWidth * 0.9,
    borderTopWidth : 1 ,
    borderColor : Color.white,
    marginTop : moderateScale(30,0.3)
  },
});
