// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect, useContext} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Button} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const eye_show = require('../../../assets/icons/eye_show.png');

const Signin: React.FC<{navigation: any}> = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handlePress = () => {
    console.log('Apple icon clicked!');
    // You can navigate or trigger any action here
  };
  const navigation = useNavigation<any>();

  const isValidEmailT = (email: any) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const validateEmail = (text: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isValid = emailRegex.test(text);
    setIsValidEmail(isValid);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.text}>Enter your details to proceed further</Text>
      <View style={styles.container_in}>
        <Text style={styles.b1_text}>Email</Text>
        <TextInput
          style={[
            styles.input,
            isValidEmail && email.length > 0 ? styles.validEmail : {},
          ]}
          placeholder="Enter email"
          placeholderTextColor="#969596"
          value={email}
          onChangeText={text => {
            setEmail(text);
            validateEmail(text); // Validate email whenever the text changes
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {!isValidEmailT(email) && email.length > 0 && (
          <Text style={styles.errorText}>Invalid email format</Text>
        )}

        <Text style={styles.b1_text}>Password</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#F08080',
              padding: 10,
              paddingLeft: 30,
              marginTop: 15,
              marginBottom: 10,
              borderRadius: 40,
              fontFamily: 'OpenSans-Regular',
              width: (screenWidth * 9) / 10,
            }}
            placeholder="Password"
            placeholderTextColor="#969596"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={!isPasswordVisible} // Toggle between true/false based on isPasswordVisible
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              marginLeft: (screenWidth * 8) / 10,
            }}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? (
              <Image
                source={require('../../../assets/icons/eye_show.png')}
                style={{justifyContent: 'center'}}
              />
            ) : (
              <Image
                source={require('../../../assets/icons/eye_off.png')}
                style={{justifyContent: 'center'}}
              />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Resetpwd')}>
          <Text style={styles.b2_text}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <Button
        style={{
          justifyContent: 'center',
          width: (screenWidth * 9) / 10,
          height: 57,
          marginTop: 51,
          borderRadius: 45,
          backgroundColor: '#F08080',
        }}
        onPress={() => navigation.navigate('LearnSection')}>
        <Text style={styles.b3_text}>Sign In</Text>
      </Button>
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>
      <View style={styles.social}>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={require('../../../assets/icons/google_ico.png')}
            style={{width: 50, height: 50}} // Adjust the size as needed
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={require('../../../assets/icons/face_ico.png')}
            style={{width: 50, height: 50}} // Adjust the size as needed
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={require('../../../assets/icons/apple_ico.png')}
            style={{width: 50, height: 50}} // Adjust the size as needed
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 50,
        }}>
        <Text style={styles.b4_text}>Don`t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.b5_text}>Sign Up</Text>
          <View style={styles.underline} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container_in: {
    width: (screenWidth * 9) / 10,
    backgroundColor: 'white',
  },
  title: {
    color: '#F08080',
    fontSize: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight / 10,
    fontFamily: 'OpenSans-Bold',
  },
  text: {
    paddingTop: 15,
    color: '#8F8E8F',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
  },
  input: {
    borderWidth: 1,
    borderColor: '#F08080',
    padding: 10,
    paddingLeft: 30,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 40,
    fontFamily: 'OpenSans-Regular',
  },
  b1_text: {
    marginTop: 40,
    color: '#F08080',
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
  },
  b2_text: {
    marginLeft: (screenWidth * 6) / 10,
    color: '#F08080',
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
    textDecorationLine: 'underline',
  },
  b3_text: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  b4_text: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
  },
  b5_text: {
    color: '#F08080',
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    // textDecorationLine: 'underline',
  },
  underline: {
    height: 2, // Thickness of the underline
    backgroundColor: '#F08080', // Match the color with the text or as desired
    width: '100%', // Match the width with the text. Adjust if necessary
    // marginTop: 1, // Adjust the spacing between the text and the underline as needed
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },

  validEmail: {
    color: '#F08080', // Change text color to red when email is valid
  },
  dividerContainer: {
    width: (screenWidth * 9) / 10,
    justifyContent: 'space-between',
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically
    marginVertical: 20, // Add some vertical margin
  },
  social: {
    width: (screenWidth * 2.3) / 5,
    justifyContent: 'space-between',
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically
    marginTop: 35,
  },
  dividerLine: {
    flex: 1, // Take up equal space
    height: 1, // 1 pixel high line
    backgroundColor: '#F08080', // Line color
  },
  dividerText: {
    marginHorizontal: 10, // Add horizontal margin around the text
    color: '#1E1D20',
    fontSize: 18,
    fontFamily: 'OpenSans-SemiBold',
    // Any additional text styling here
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
