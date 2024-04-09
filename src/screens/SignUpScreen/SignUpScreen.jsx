import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../LoginScreen/firebase'
import Icon from 'react-native-vector-icons/Feather';

const SignUpScreen = NativeStack => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAux, setPasswordAux] = useState('')

    const [isUsernameValid, setIsUsernameValid] = useState(true)
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPhoneValid, setIsPhoneValid] = useState(true)

    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const handleLogin = async () => {
        var isAllValid = true
        if (!username) {
            isAllValid = false
            setIsUsernameValid(false)
        } else {
            if (!regexSpecialCharactes(username)) {
                isAllValid = false
                return Alert.alert(
                    "Username invalido",
                    "Tu username no debe contener caracteres especiales.")
            }
        }

        if (!email) {
            isAllValid = false
            setIsEmailValid(false)
        } else {
            if (!regexEmail(email)) {
                isAllValid = false
                return Alert.alert(
                    "Email incorrecto",
                    "El correo debe debe ser valido.")
            }
        }


        if (!phone) {
            isAllValid = false
            setIsPhoneValid(false)
        } else {
            if (!regexPhone(phone)) {
                isAllValid = false
                return Alert.alert(
                    "Telefono invalido",
                    "El telefono debe ser valido.")
            }
        }

        if (!password) {
            isAllValid = false
            setIsPasswordValid(false)
        } else {
            if (password.length < 6) {
                isAllValid = false
                return Alert.alert(
                    "Contra incorrecta",
                    "La contra debe contener al menos 6 caracteres")
            }
        }

        if (isAllValid) {
            try {
                await createUserWithEmailAndPassword(auth, email, password)
            } catch (error) {
                Alert.alert(
                    "Create account failed",
                    "Please insert a valid email and password",
                )
                console.log(error.message)
            }
        }

    }

    const regexSpecialCharactes = (username) => {
        const specialCharactesRegex = /^[a-zA-Z0-9\s]+$/
        if (specialCharactesRegex.test(username)) {
            return true
        } else {
            return false
        }
    }
    const regexEmail = (email) => {
        const emailRegex = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/
        if (emailRegex.test(email)) {
            return true
        } else {
            return false
        }
    }


    const regexPhone = (phone) => {
        const phoneRegex = /^9\d{0,8}$/
        if (phoneRegex.test(phone)) {
            return true
        } else {
            return false
        }
    }

    return (
        <View style={{ flex: 1, padding: 18, alignItems: 'center', justifyContent: 'center',backgroundColor:"#5E00BE" }}>
            <TouchableOpacity
                onPress={() => {
                    NativeStack.navigation.goBack();
                }}
                style={{
                    backgroundColor: '#000',
                    borderRadius: 24,
                    position: 'absolute',
                    top: 60,
                    left: 10,
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',

                }}>
                <Icon name="arrow-left" size={30} color="#fff" />
            </TouchableOpacity>

            <TextInput
                style={{
                    width: '100%',
                    height: 60,
                    marginTop: 12,
                    borderColor: isUsernameValid ? '#fff' : '#ef5350',
                    paddingStart: 16,
                    borderRadius: 10,
                    borderWidth: 1,
                    color: isUsernameValid ? '#fff' : '#ef5350'
                }}
                autoCapitalize='none'
                placeholder='Ingresa tus nombres'
                value={username}
                placeholderTextColor={isUsernameValid ? '#fff': '#ef5350'}
                onChangeText={text => {
                    setIsUsernameValid(true)
                    setUsername(text)

                }
                }
            />
            <TextInput
                style={{
                    width: '100%',
                    height: 60,
                    marginTop: 12,
                    borderColor: isEmailValid ? '#fff' : '#ef5350',
                    paddingStart: 16,
                    borderRadius: 10,
                    borderWidth: 1,
                    color: isEmailValid ? '#fff' : '#ef5350'
                }}
                autoCapitalize='none'
                placeholder='Ingresa tu correo'
                value={email}
                placeholderTextColor={isEmailValid ? '#fff' : '#ef5350'}
                onChangeText={text => {
                    setIsEmailValid(true)
                    setEmail(text)

                }
                }
            />
              <TextInput
                style={{
                    width: '100%',
                    height: 60,
                    marginTop: 12,
                    borderColor: isPhoneValid ? '#fff' : '#ef5350',
                    paddingStart: 16,
                    borderRadius: 10,
                    borderWidth: 1,
                    color: isPhoneValid ? '#fff' : '#ef5350'
                }}
                autoCapitalize='none'
                placeholder='Ingresa tu telefono'
                value={phone}
                placeholderTextColor={isPhoneValid ? '#fff' : '#ef5350'}
                onChangeText={text => {
                    setIsPhoneValid(true)
                    setPhone(text)
                }
                }
            />
            <TextInput
                style={{
                    width: '100%',
                    height: 60,
                    marginTop: 12,
                    borderColor: isPasswordValid ? '#fff' : '#ef5350',
                    paddingStart: 16,
                    borderRadius: 10,
                    borderWidth: 1,
                    color: isPasswordValid ? '#fff' : '#ef5350'
                }}
                secureTextEntry
                autoCapitalize='none'
                placeholder='Crea una clave'
                value={password}
                placeholderTextColor={isPasswordValid ? '#fff' : '#ef5350'}
                onChangeText={text => {
                    setIsPasswordValid(true)
                    setPassword(text)
                }
                }
            />
                <TextInput
                style={{
                    width: '100%',
                    height: 60,
                    marginTop: 12,
                    borderColor: isPasswordValid ? '#fff' : '#ef5350',
                    paddingStart: 16,
                    borderRadius: 10,
                    borderWidth: 1,
                    color: isPasswordValid ? '#fff' : '#ef5350'
                }}
                secureTextEntry
                autoCapitalize='none'
                placeholder='Repite tu clave'
                value={passwordAux}
                placeholderTextColor={isPasswordValid ? '#fff' : '#ef5350'}
                onChangeText={text => {
                    setIsPasswordValid(true)
                    setPasswordAux(text)
                }
                }
            />
            <TouchableOpacity
                onPress={handleLogin}
                style={{
                    backgroundColor: '#000',
                    borderRadius: 20,
                    padding: 16,
                    marginTop: 18,
                    width: '100%'
                }} >
                <Text
                    style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}>
                    Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignUpScreen