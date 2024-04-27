import 'react-native-gesture-handler';

// Import React and Component
import React, {useState, useEffect} from 'react';

import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import {textToSpeech} from '../../../redux/slices/audio';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../components/header';
import CustomDialog from '../../../components/dialogModal';
import RewardDialog from '../../../components/rewardModal';
import ChatBox from '../../../components/chatBox';

const appea_ico = require('../../../../assets/icons/appea_ico.png');
const addcolor_ico = require('../../../../assets/icons/learn/appearance/addcolor_ico.png');

const t_icon = require('../../../../assets/icons/tom_ico.png');
const me_icon = require('../../../../assets/icons/me.png');
const turtle_ico = require('../../../../assets/icons/turtle_ico.png');
const sound_ico = require('../../../../assets/icons/charm_sound-up.png');
const message = require('../../../../assets/icons/tchat_b.png');
const mechat_b = require('../../../../assets/icons/mechat_b.png');
const reward_ico = require('../../../../assets/icons/main/reward.png');
const mico_ico = require('../../../../assets/icons/mico.png');

const black_eye = require('../../../../assets/icons/learn/appearance/black_eye.png');
const blue_eye = require('../../../../assets/icons/learn/appearance/blue_eye.png');
const brown_eye = require('../../../../assets/icons/learn/appearance/brown_eye.png');
const green_eye = require('../../../../assets/icons/learn/appearance/green_eye.png');
const grey_eye = require('../../../../assets/icons/learn/appearance/grey_eye.png');
const yellow_eye = require('../../../../assets/icons/learn/appearance/yellow_eye.png');

const msg_send_passive = require('../../../../assets/icons/msg_send_passive.png');
const msg_send_active = require('../../../../assets/icons/msg_send_active.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const AppearanceSecton = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {txtAudio} = useSelector(state => state.audio);
  const [modalVisible, setModalVisible] = useState(true);
  const [showReward, setShowReward] = useState(false);
  const [hair, setHair] = useState('');
  const [eye, setEye] = useState('');
  const [progress, setProgress] = useState(0.125);
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 3;

  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const colors = [
    {color: '#000000', label: 'Black'},
    {color: '#B04F2E', label: 'Brunette'},
    {color: '#FFED88', label: 'Blonde'},
    {color: '#FF6C1A', label: 'Red'},
    {color: '#D3D3D3', label: 'Grey'},
    {color: '#FFFFFF', label: 'White'},
    {color: '#B6A88C', label: 'Auburn'},
    {label: 'Add', image: addcolor_ico},
  ];
  const eyes = [
    {label: 'Brown', image: brown_eye},
    {label: 'Blue', image: blue_eye},
    {label: 'Green', image: green_eye},
    {label: 'Yellow', image: yellow_eye},
    {label: 'Grey', image: grey_eye},
    {label: 'Black', image: black_eye},
  ];
  const [text, setText] = useState('');
  const messageIcon = text ? msg_send_active : msg_send_passive;

  const [errorMsg, setErrorMsg] = useState('');

  const handleChangeText = text => {
    try {
      if (text.length < 11) {
        setText(text);
      }
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const handleSend = () => {
    try {
      setShowButton(true);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const handleClickContinue = () => {
    console.log('------currentStep-----', currentStep);
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setShowButton(false);
      setProgress(0.125 * (currentStep + 1));
    } else {
      setShowReward(true);
    }
  };

  const handleClick = async () => {
    try {
      setCurrentStep(1);
      setModalVisible(false);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const handleSelect = (select, type) => {
    console.log('--------selected---------', select);
    if (type === 'hair') {
      setHair(select);
    }
    if (type === 'eye') {
      setEye(select);
    }
    setShowButton(true);
  };

  const handleClickMove = async () => {
    try {
      const data = {
        name: text,
        hair: hair,
        eye: eye,
      };
      setCurrentStep(1);
      navigation.navigate('QualitiesSection', {param: data});
      // navigation.navigate('MainPage', {param: true});
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const handleClickSound = async txt => {
    try {
      console.log('----------txt----------', txt);
      await dispatch(textToSpeech(txt));
      console.log('----------finished-----------------');
      setIsLoading(true);
      console.log('------------useEffect', isLoading);
      // dispatch(setStateFunc);
    } catch (error) {
      console.log('-----------error----------', error);
    }
  };

  useEffect(() => {
    if (isLoading) {
      console.log('-----------audio playing--------------');
      playAudio(txtAudio);
    }
  }, [isLoading, playAudio, txtAudio]);

  const playAudio = async audioBase64 => {
    console.log('---------playAudio---------');

    const audioPath = `${RNFS.TemporaryDirectoryPath}tempaudio.mp3`;

    const base64String = audioBase64.replace('data:audio/mp3;base64,', '');

    await RNFS.writeFile(audioPath, base64String, 'base64')
      .then(() => {
        console.log('File written');
      })
      .catch(error => {
        console.error('Error writing file', error);
      });

    const sound = new Sound(audioPath, '', error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      // Play the sound if loaded successfully
      sound.play(success => {
        if (success) {
          console.log('Successfully finished playing');
          setIsLoading(false);
        } else {
          console.log('Playback failed due to audio decoding errors');
          setIsLoading(false);
        }
      });
    });
  };

  const MessageBlock = ({children}) => (
    <>
      <View style={styles.imageContainer}>
        <Image source={message} />
        <Text style={styles.title}>{children}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 9,
          position: 'absolute',
          top: 230,
          right: screenWidth / 20,
        }}>
        <TouchableOpacity onPress={() => handleClickSound(children)}>
          <Image source={sound_ico} />
        </TouchableOpacity>
        <Image source={turtle_ico} />
      </View>
    </>
  );

  const CircleButton = ({color, label, onPress}) => {
    return (
      <View
        style={{
          width: screenWidth / 5,
          height: 90,
          borderRadius: 10,
          borderColor: '#D3D3D3',
          borderWidth: 1,
          alignItems: 'center',
          marginTop: 10,
          justifyContent: 'center',
        }}>
        {label === 'Add' ? (
          <TouchableOpacity onPress={onPress} style={[styles.circleButton]}>
            <Image source={addcolor_ico} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={onPress}
            style={[
              styles.circleButton,
              {
                backgroundColor: color,
                borderColor: '#D3D3D3',
                borderWidth: label === 'White' ? 1 : 0,
              },
            ]}
          />
        )}

        <Text style={styles.colorTitle}>{label}</Text>
      </View>
    );
  };

  const EyeButton = ({image, label, onPress}) => {
    return (
      <View
        style={{
          width: screenWidth / 4,
          height: 90,
          borderRadius: 10,
          borderColor: '#D3D3D3',
          borderWidth: 1,
          alignItems: 'center',
          marginTop: 10,
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={onPress} style={[styles.circleButton]}>
          <Image source={image} />
        </TouchableOpacity>
        <Text style={styles.colorTitle}>{label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={handleClick}
        icon={appea_ico}
        title="Step 1. Appearance"
        description="Let's try to describe your friend's appearance."
      />

      <RewardDialog
        modalVisible={showReward}
        setModalVisible={setModalVisible}
        handleClick={handleClickMove}
        title="Great job!"
        text="You've finished typing level!NN  Claim your reward."
        buttonText="Go to Step 2"
        icon={reward_ico}
      />

      <Header
        visible={true}
        text={'Appearance'}
        color={'#FFFBF8'}
        editalbe={false}
        progress={progress}
      />

      <Image
        source={t_icon}
        style={{position: 'absolute', left: screenWidth / 20, top: 130}}
      />
      <Image
        source={me_icon}
        style={{position: 'absolute', right: screenWidth / 20, top: 330}}
      />

      {currentStep === 1 && (
        <>
          <MessageBlock
            children={
              "Hey, I wanted to ask\nyou about your friend.\nWhat's his/her name?"
            }
          />

          <View style={styles.me_imageContainer}>
            <Image source={mechat_b} />
            <>
              <Text style={styles.m_title}>
                {`My best friend \nis ${text || '_________'}.`}
              </Text>
              <View style={styles.buttonIcon}>
                <TouchableOpacity
                  onPress={() => handleClickSound(`My best friend is ${text}`)}>
                  <Image source={sound_ico} />
                </TouchableOpacity>
                <Image source={turtle_ico} />
              </View>
            </>
          </View>
          {!showButton && (
            <>
              <ChatBox
                // handleInput={handleInput}
                text={text}
                handleChangeText={handleChangeText}
                handleSend={handleSend}
                messageIcon={messageIcon}
                bottom={0}
                mico={true}
              />
              <TouchableOpacity
                style={{position: 'absolute', bottom: 60, right: 15}}>
                <Image source={mico_ico} />
              </TouchableOpacity>
            </>
          )}
        </>
      )}
      {currentStep === 2 && (
        <>
          <MessageBlock
            children={`Cool. What does \n${text} look like?\nDescribe his hair.`}
          />

          <View style={styles.me_imageContainer}>
            <Image source={mechat_b} />

            <>
              <Text style={[styles.m_title, {top: -60}]}>
                {`He has ${hair || '________'} hair.`}
              </Text>
              <View style={styles.buttonIcon}>
                <TouchableOpacity
                  onPress={() => handleClickSound(`He has ${hair} hair.`)}>
                  <Image source={sound_ico} />
                </TouchableOpacity>
                <Image source={turtle_ico} />
              </View>
            </>
          </View>
          {!showButton && (
            <View style={[styles.chatBackground]}>
              <Text
                style={[
                  styles.colorTitle,
                  {marginTop: 1, width: (screenWidth * 9) / 10},
                ]}>
                Choose color
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around',
                  alignItems: 'flex-start',
                  marginTop: 15,
                }}>
                {colors.map((color, index) => (
                  <View key={index}>
                    <CircleButton
                      color={color.color}
                      label={color.label}
                      onPress={() => handleSelect(color.label, 'hair')}
                    />
                  </View>
                ))}
              </View>
            </View>
          )}
        </>
      )}
      {currentStep === 3 && (
        <>
          <MessageBlock children={`How about\n${text} eyes?`} />

          <View style={styles.me_imageContainer}>
            <Image source={mechat_b} />

            <>
              <Text style={styles.m_title}>
                {`He has ${eye || '_______'} eyes.`}
              </Text>
              <View style={styles.buttonIcon}>
                <TouchableOpacity
                  onPress={() => handleClickSound(`He has ${eye}`)}>
                  <Image source={sound_ico} />
                </TouchableOpacity>
                <Image source={turtle_ico} />
              </View>
            </>
          </View>
          {!showButton && (
            <View style={[styles.chatBackground]}>
              <Text
                style={[
                  styles.colorTitle,
                  {marginTop: 1, width: (screenWidth * 9) / 10},
                ]}>
                Choose color
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around',
                  alignItems: 'flex-start',
                  marginTop: 15,
                }}>
                {eyes.map((eye, index) => (
                  <View key={index}>
                    <EyeButton
                      image={eye.image}
                      label={eye.label}
                      onPress={() => handleSelect(eye.label, 'eye')}
                    />
                  </View>
                ))}
              </View>
            </View>
          )}
        </>
      )}

      {showButton && (
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: (screenWidth * 8) / 10,
            height: 57,
            position: 'absolute',
            bottom: 40,
            borderRadius: 45,
            backgroundColor: '#F08080',
          }}
          onPress={() => handleClickContinue()}>
          <Text style={styles.b1_text}>Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppearanceSecton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFBF8',
    height: screenHeight,
    width: screenWidth,
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    position: 'relative',
    top: -100,
    left: 10,
    // textAlign: 'left',
  },
  colorTitle: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
  },
  m_title: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    position: 'relative',
    top: -67,
    right: 10,
    // textAlign: 'left',
  },
  b1_text: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  b2_text: {
    color: '#F08080',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  imageContainer: {
    position: 'absolute',
    right: screenWidth / 20,
    top: 130,
    alignItems: 'center',
  },
  me_imageContainer: {
    position: 'absolute',
    left: screenWidth / 20,
    top: 320,
    alignItems: 'center',
  },
  icon: {
    justifyContent: 'center',
    width: 72,
    height: 72,
  },
  buttonIcon: {
    flexDirection: 'row',
    gap: 9,
    position: 'absolute',
    top: 70,
    left: 0,
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clickStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width: '45%',
    height: 47,
    borderColor: '#F08080',
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 45,
    backgroundColor: 'white',
  },
  chatBackground: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 25,
    padding: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: screenWidth,
    height: 316,
    bottom: 0,
    position: 'absolute',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android Shadow
    elevation: 15,
  },
});
