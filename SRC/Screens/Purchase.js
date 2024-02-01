import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import ScreenBoiler from '../Components/ScreenBoiler'
import LinearGradient from 'react-native-linear-gradient'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'
import { windowHeight, windowWidth } from '../Utillity/utils'
import CustomText from '../Components/CustomText'
import Modal from 'react-native-modal';
import CustomButton from '../Components/CustomButton'
import Color from '../Assets/Utilities/Color'
import BookingHistoryModal from '../Components/BookingHistoryModal'
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomImage from '../Components/CustomImage'



const Purchase = () => {
    const [coins, setCoins]=useState('');
    const [isVisible, setIsVisible]=useState(false);
    const coinsConfig=[
        {id:"1",  coin:"10 coins", onPress: () => {}},
        {id:"2",  coin:"20 coins", onPress: () => {}},
        {id:"3",  coin:"30 coins", onPress: () => {}},
        {id:"4",  coin:"40 coins", onPress: () => {}},
        {id:"5",  coin:"50 coins", onPress: () => {}},
        {id:"6",  coin:"Other...", onPress: () => { setIsVisible(true) }},
    ]    
    return (
   

    <ScreenBoiler
      showHeader={true}
      showback={true}

      showUser={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{x: 0.1, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={Color.themeGradient}
        style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: windowHeight * 0.155,
              justifyContent:"center",
              // paddingTop : moderateScale(20,0.3),
              alignItems: 'center',
            }}
            style={{
                width: windowWidth,
            }}>

<View style={{justifyContent:"space-between", height:windowHeight * 0.8}}>
<View>

                <CustomText isBold style={styles.text1}>Buy Coins</CustomText>
</View>
<View style={{alignItems:"center"}}>
    <CustomImage
    source={require('../Assets/Images/Coins-main.png')}
            resizeMode={"cover"}
    />
</View>

                <View style={styles.buttons}>
                <FlatList
                scrollEnabled={false}
                numColumns={2}
                data={coinsConfig}
                keyExtractor={item=> item.id}
                renderItem={({item}) =>

                    <CustomButton
                    // image={require('../Assets/Images/coins.png')}
                textColor={Color.black}
                onPress={item.onPress}
                width={windowWidth * 0.4}
                marginTop={moderateScale(37,0.7)}
                margin={moderateScale(13,0.6)}
                height={windowHeight * 0.05}
                borderRadius={moderateScale(25, 0.6)}
                text={item.coin}
                fontSize={moderateScale(14, 0.3)}
                textTransform={'uppercase'}
                isGradient={true}
                isBold
                />
                 
                
                }                
            
                />
                </View>
                {/* <CustomButton
            textColor={Color.black}
            onPress={() => {
                //   setSelected('Product');
            }}
            width={windowWidth * 0.22}
            height={windowHeight * 0.05}
            borderRadius={moderateScale(25, 0.6)}
            text={'10 Coins'}
            fontSize={moderateScale(14, 0.3)}
            textTransform={'uppercase'}
            isGradient={true}
            isBold
            // marginBottom={moderateScale(30, 0.3)}
            />
                <CustomButton
            textColor={Color.black}
            onPress={() => {
                //   setSelected('Product');
            }}
            width={windowWidth * 0.22}
            height={windowHeight * 0.05}
            borderRadius={moderateScale(25, 0.6)}
            text={'20 Coins'}
            fontSize={moderateScale(14, 0.3)}
            textTransform={'uppercase'}
            isGradient={true}
            isBold
            // marginBottom={moderateScale(30, 0.3)}
            />
        </View>
                <View style={styles.buttons}>
                <CustomButton
            textColor={Color.black}
            onPress={() => {
                //   setSelected('Product');
            }}
            width={windowWidth * 0.22}
            height={windowHeight * 0.05}
            borderRadius={moderateScale(25, 0.6)}
            text={'10'}
            fontSize={moderateScale(14, 0.3)}
            textTransform={'uppercase'}
            isGradient={true}
            isBold
            // marginBottom={moderateScale(30, 0.3)}
            />
                <CustomButton
            textColor={Color.black}
            onPress={() => {
                //   setSelected('Product');
            }}
            width={windowWidth * 0.22}
            height={windowHeight * 0.05}
            borderRadius={moderateScale(25, 0.6)}
            text={'20'}
            fontSize={moderateScale(14, 0.3)}
            textTransform={'uppercase'}
            isGradient={true}
            isBold
            // marginBottom={moderateScale(30, 0.3)}
            />
        </View>
                <View style={styles.buttons}>
                <CustomButton
            textColor={Color.black}
            onPress={() => {
                //   setSelected('Product');
            }}
            width={windowWidth * 0.22}
            height={windowHeight * 0.05}
            borderRadius={moderateScale(25, 0.6)}
            text={'10'}
            fontSize={moderateScale(14, 0.3)}
            textTransform={'uppercase'}
            isGradient={true}
            isBold
            // marginBottom={moderateScale(30, 0.3)}
            />
                <CustomButton
            textColor={Color.black}
            onPress={() => {
                setIsVisible(true)
            //   setSelected('Product');
        }}
        width={windowWidth * 0.22}
        height={windowHeight * 0.05}
        borderRadius={moderateScale(25, 0.6)}
        text={'other...'}
        fontSize={moderateScale(14, 0.3)}
        textTransform={'uppercase'}
        isGradient={true}
        isBold
        // marginBottom={moderateScale(30, 0.3)}
        />
        </View>
    */}
       {isVisible && <View style={{width:windowWidth * 0.35,height:windowHeight * 0.05}}></View>}
     <View>

       {!isVisible && <CustomButton
            textColor={Color.black}
            onPress={() => {
                //   setSelected('Product');
            }}
            width={windowWidth * 0.35}
            height={windowHeight * 0.05}
            borderRadius={moderateScale(25, 0.6)}
            text={'Purchase'}
            marginTop={moderateScale(19,0.6)}
            fontSize={moderateScale(14, 0.3)}
            textTransform={'uppercase'}
            isGradient={true}
            isBold
            // marginBottom={moderateScale(30, 0.3)}
            />} 
            </View>
            </View>
            </ScrollView>
            </LinearGradient>
            <Modal isVisible={isVisible}
            onBackdropPress={()=>{
                setIsVisible(false)
            }}
            >
<View style={styles.modal}>

    {/* <TextInputWithTitle/> */}
    <TextInputWithTitle
            titleText={'Enter Your Coins'}
            placeholder={'Enter Your Coins'}
            // setText={}
            value={""}
            viewHeight={0.06}
            viewWidth={0.74}
            inputWidth={0.74}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(20, 0.3)}
            marginBottom={moderateScale(20, 0.7)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(30, 0.4)}


          />
               <CustomButton
            textColor={Color.black}
            onPress={() => {
                setIsVisible(false);
            //   setSelected('Product');
        }}
        // borderColor={Color.white}
        // borderWidth={2}
        
        width={windowWidth * 0.35}
        height={windowHeight * 0.05}
        borderRadius={moderateScale(25, 0.6)}
        text={'Purchase'}
        fontSize={moderateScale(14, 0.3)}
        textTransform={'uppercase'}
        
        isGradient={true}
        isBold
        // marginBottom={moderateScale(30, 0.3)}
        />
{/* </LinearGradient> */}
</View>
            </Modal>
            </ScreenBoiler>
   
  )
}

export default Purchase;
const styles = ScaledSheet.create({
    container: {
        paddingTop: windowHeight * 0.03,
      // justifyContent: "center",
      height: windowHeight * 0.9,
      width: windowWidth,
      alignItems: 'center',
      // backgroundColor : Color.green
    },
    text1: {
      textTransform: 'uppercase',
      color: Color.white,
      textAlign: 'center',
      fontSize: moderateScale(20, 0.3),
    },
    text1Absolute: {
      textTransform: 'uppercase',
      color: Color.white,
      textAlign: 'center',
      fontSize: moderateScale(16, 0.3),
      // position : 'absolute',
      // bottom : moderateScale(10,0.3),
      // marginTop : moderateScale(10,0.3),
      // lineHeight: moderateScale(32, 0.3),
    },
    bannerView: {
      width: windowWidth * 0.85,
      height: windowHeight * 0.46,
      backgroundColor: 'black',
      marginTop: moderateScale(10, 0.3),
    },
    viewAll: {
      color: Color.white,
      fontSize: moderateScale(12, 0.3),
    },
    mapview: {
      // backgroundColor: 'red',
      width: windowWidth * 0.76,
      flexDirection: 'row',
      flexWrap: 'wrap',
      // paddingHorizontal: moderateScale(10, 0.6),
      paddingVertical: moderateScale(5, 0.6),
    },
    buttons:{
        // flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:5,
        width:windowWidth
    }
    ,
    modal:{
        backgroundColor:Color.black,
        backgroundColor: 'rgba(109, 106, 108, 0.72)',
        // backgroundColor: 'rgba(76, 73, 75, 0.79)',
        // backgroundColor: 'rgba(36, 35, 36, 0.53)',
        backgroundColor: 'rgba(58, 56, 56, 0.63)',
        
        borderRadius:moderateScale(14,0.4),
        borderWidth:2,
        borderColor:Color.themeColor,
        width:windowWidth * 0.9,
        height:windowHeight * 0.3,
        flexDirection:"column",
        alignItems: 'center',
        paddingTop: windowHeight * 0.03,
        gap:12
    }
  });
  