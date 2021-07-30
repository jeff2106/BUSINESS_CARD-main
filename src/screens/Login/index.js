import React, {Component} from 'react'
import {
    View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, ScrollView
} from 'react-native'
import styles from './style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Login() {

    
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.logoSpace}>
                    <Image source={require('../../assets/logo.png')} style={styles.logo}/>
    
                </View>
                <View style={styles.TextInputSpace}>
                        <TextInput
                            style={styles.textInput_form}
                            placeholder='Numéro de telephone'
                            placeholderTextColor="#CFCFCF"
                        />
                        <TextInput
                            style={styles.textInput_form}
                            placeholder='Email'
                            placeholderTextColor="#CFCFCF"
                        />
                        <TextInput
                            style={styles.textInput_form}
                            placeholder='Mot de passe' secureTextEntry
                            placeholderTextColor="#CFCFCF"
                        />
                        <View>
                            <TouchableOpacity onPress={() => console.log('ok')}>
                                <Text style={{textAlign: 'center', margin: 10, color: '#EE7B38'}}>Mot de passe oublié ?</Text>
                            </TouchableOpacity>
                        
                        </View>
    
                </View>

                <View>
                    <View>
                        <TouchableOpacity
                            style={styles.customBtnBGGmail}
                            onPress={() => console.log('ok')}
                        >
                            <Text style={styles.customBtnBGTextGmail}>S'inscrire avec Email</Text>
                            <Icon name="google" size={30} color="#fff" style={{alignSelf: 'center', margin: 5, top: -2}} />

                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.customBtnBGFb}
                            onPress={() => console.log('ok')}
                        >
                            <Text style={styles.customBtnBGTextFb}>S'inscrire avec Facebook</Text>
                            <Icon name="facebook" size={30} color="#fff" style={{alignSelf: 'center', margin: 5, top: -2}} />

                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

