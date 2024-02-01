import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import Modal from 'react-native-modal';
import ReviewCard from './ReviewCard';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {theme} from 'native-base';
import {mode} from 'native-base/lib/typescript/theme/tools';
import CustomButton from './CustomButton';

const FilteringModal = ({
  isVisible,
  setIsVisible,
  selectedItem,
  setSelectedItem,
}) => {
  const dummyArray = [
    'featured barber',
    'nearest to me',
    'earliest',
    'categorize',
  ];
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="up"
      style={{
        // borderRadius: moderateScale(20, 0.6),
        // paddingHorizontal: moderateScale(15, 0.6),
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: Color.white,
        // height: windowHeight * 0.4,
        // zIndex:1
      }}
      onBackdropPress={() => {
        setIsVisible(false);
      }}>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          //   height: windowHeight * 0.2,
          width: windowWidth * 0.8,
          flexWrap: 'wrap',
          flexDirection: 'row',
          paddingBottom: moderateScale(10, 0.6),
          borderRadius: moderateScale(10, 0.6),
          overflow: 'hidden',
        }}>   
        <View style={styles.Header}>
          <CustomText
            style={{
              fontSize: moderateScale(15, 0.6),
              fontStyle: 'italic',
            }}>
            Barber Filters
          </CustomText>
        </View>
        {dummyArray.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (selectedItem.includes(item)) {
                  const temp = [...selectedItem];
                  setSelectedItem(
                    temp?.filter((item1, index) => item1 != item),
                  );
                } else {
                  setSelectedItem(prev => [...prev, item]);
                }
              }}
              style={{
                padding: moderateScale(8, 0.6),
                borderRadius: moderateScale(25, 0.6),
                borderColor: Color.themeColor,
                borderWidth: 1,
                marginHorizontal: moderateScale(5, 0.3),
                marginVertical: moderateScale(2, 0.3),
                backgroundColor: selectedItem.includes(item)
                  ? Color.themeColor
                  : Color.white,
              }}>
              <CustomText
                //   isBold
                style={{
                  fontSize: moderateScale(13, 0.6),
                  paddingHorizontal: moderateScale(8, 0.6),

                  // backgroundColor: 'red',
                  color: Color.black,
                }}>
                {item}
              </CustomText>
            </TouchableOpacity>
          );
        })}
        {selectedItem.length >0  && (
          <CustomButton
            textColor={Color.white}
            borderWidth={1}
            borderRadius={moderateScale(15, 0.6)}
            borderColor={Color.white}
            width={windowWidth * 0.15}
            height={windowHeight * 0.04}
            text={'ok'}
            fontSize={moderateScale(13, 0.3)}
            onPress={() => {
                setIsVisible(false )
            }}
            isBold
            marginHorizontal={moderateScale(20, 0.3)}
            marginTop={moderateScale(5, 0.3)}
          />
        )}
      </View>
    </Modal>
  );
};

export default FilteringModal;

const styles = ScaledSheet.create({
  Header: {
    width: '100%',
    height: windowHeight * 0.07,
    backgroundColor: Color.themeColor1,
    marginBottom: moderateScale(20, 0.3),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
