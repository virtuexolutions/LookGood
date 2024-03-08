import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import Modal from 'react-native-modal';
import ReviewCard from './ReviewCard';
import {moderateScale} from 'react-native-size-matters';
import NoData from './NoData';

const ShowReview = ({modal, setModal, barberDetails }) => {
  // console.log('🚀 ~ ShowReview ~ barberDetails:', barberDetails);
  const reviewArray = [
    {
      image: require('../Assets/Images/dummyUser1.png'),
      name: 'john',
      review: 'great hjkashdkjahskjdghkasgdjkgask dkasgdkjga',
    },
    {
      image: require('../Assets/Images/dummyUser1.png'),
      name: 'aleen',
      review: 'very nice',
    },
    {
      image: require('../Assets/Images/dummyUser1.png'),
      name: 'alvin',
      review: 'well done',
    },
    {
      image: require('../Assets/Images/dummyUser1.png'),
      name: 'chris',
      review: 'keep it up',
    },
    {
      image: require('../Assets/Images/dummyUser1.png'),
      name: 'john',
      review: 'dhfghdgfhgjdhfjdgf',
    },
    {
      image: require('../Assets/Images/dummyUser1.png'),
      name: 'willaim',
      review: 'great',
    },
    {
      image: require('../Assets/Images/dummyUser1.png'),
      name: 'aleen',
      review: 'very nice',
    },

    {
      image: require('../Assets/Images/dummyUser1.png'),
      name: 'alvin',
      review: 'well done',
    },
    {
      image: require('../Assets/Images/dummyUser1.png'),
      name: 'chris',
      review: 'keep it up',
    },
    {
      image: require('../Assets/Images/dummyUser1.png'),
      name: 'willaim',
      review: 'great',
    },
    {
      image: require('../Assets/Images/dummyUser1.png'),
      name: 'aleen',
      review: 'very nice',
    },

    {
      image: require('../Assets/Images/dummyUser1.png'),
      name: 'alvin',
      review: 'well done',
    },
    {
      image: require('../Assets/Images/dummyUser1.png'),
      name: 'chris',
      review: 'keep it up',
    },
  ];
  return (
    <Modal
      isVisible={modal}
      onBackdropPress={() => {
        setModal(false);
        console.log('here i m ');
      }}>
      <View style={styles.mainContainer}>
        <CustomText isBold style={styles.heading}>
          Reviews
        </CustomText>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={barberDetails}
          style={{
            width: '100%',
          }}
          contentContainerStyle={{
            paddingBottom: moderateScale(40, 0.3),
          }}
          ListEmptyComponent={() => {
            return (
              <View style={{
                // backgroundColor:'red',
                height:windowHeight*0.7,
                justifyContent:'center'
              }}>
                <CustomText  style={[styles.heading ,{
                  fontSize:moderateScale(15,.6)
                }]}>
                  barber have no review yet
                </CustomText>
              </View>
            );
          }}
          renderItem={({item, index}) => {
            return (
              <ReviewCard
                modal={modal}
                setModal={setModal}
                item={item}
                fromDetail={true}
                // barberDetails={barberDetails}
              />
            );
          }}
        />
      </View>
    </Modal>
  );
};

export default ShowReview;

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: moderateScale(20, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
    alignItems: 'center',
    height: windowHeight * 0.85,
    backgroundColor: Color.white,
  },
  heading: {
    textAlign: 'center',
    color: Color.black,
    paddingTop: moderateScale(15, 0.6),
    fontSize: moderateScale(20, 0.6),
  },
});
