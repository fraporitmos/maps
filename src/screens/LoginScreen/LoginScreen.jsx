import React, { useState } from 'react'
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const LoginScreen = nativeStack => {
    const [email, setEmail] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [password, setPassword] = useState('')
    const [isPasswordValid, setIsPasswordValid] = useState(true)

    const handleLogin = async () => {
        var isAllValid = false
        if (email) {
           isAllValid = true
           if(regexEmail(email) ){
             isAllValid = true
           }else{
             Alert.alert("Email incorrecto", "El correo debe debe ser valido.")
             setIsEmailValid(false)
             isAllValid = false
           }
        }else{
            setIsEmailValid(false)
            isAllValid = false

        }
        if(password){
            isAllValid = true
        }else{
            isAllValid = false
            setIsPasswordValid(false)
        }

        if(isAllValid){
            try {
                console.log(email)
                await signInWithEmailAndPassword(auth,email, password)
            } catch (error) {
                Alert.alert("Inicio de sesion fallido", "La cuenta en cuestion no esta registrada")
            }
        }
    }

    const regexEmail = (email) => {
        const emailRegex = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/
        if(emailRegex.test(email)){
            return true
        }else{
            return false
        }
    }

    return (

        <>
            <View style={{ flex: 1, alignItems: 'center', justifyContent:'center', paddingHorizontal: 18 , backgroundColor:"#5E00BE"}}>
                <Image
                    style={{
                        width: 250, height: 250,
                        resizeMode: 'contain'
                    }}
                    source={require('../../assets/logo.png')}
                />

                <TextInput
                    style={{
                        width: '100%',
                        height: 60,
                        marginTop: 12,
                        borderColor: isEmailValid ? '#fff' : '#fff',
                        paddingStart:16,

                        borderRadius: 10,
                        borderWidth: 1,
                        color: isEmailValid  ? '#fff' : '#fff'
                    }}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    placeholder='Usuario'
                    value={email}
                    placeholderTextColor={'#fff'}
                    onChangeText={text => 
                        {
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
                        borderColor: isPasswordValid ? '#fff' : '#fff',
                        borderWidth: 1,
                        borderRadius: 10,
                        color:isPasswordValid ? '#fff' : '#fff',
                        paddingStart:16,

                    }}
                    placeholder='Clave'
                    secureTextEntry
                    value={password}
                    placeholderTextColor={'#fff'}

                    onChangeText={text => 
                       { 
                        setPassword(text)
                        setIsPasswordValid(true)
                      }
                    }
                />
                <TouchableOpacity
                    onPress={
                        handleLogin
                    }
                    style={{
                        backgroundColor: '#4285F4',
                        padding: 16,
                        width: '100%',
                        borderRadius: 10,
                        marginTop: 16
                    }} >
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: 18,
                            fontWeight: 'bold'
                        }}>
                        Iniciar Sesion</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        nativeStack.navigation.navigate('SignUpScreen')
                    }}
                    style={{
                        backgroundColor: '#000',
                        padding: 16,
                        width: '100%',
                        borderRadius: 10,

                        marginTop: 16
                    }} >
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: 18,
                            fontWeight: 'bold'
                        }}>
                        Crear cuenta</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default LoginScreen