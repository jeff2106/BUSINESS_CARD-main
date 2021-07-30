import {StyleSheet} from 'react-native';

export default StyleSheet.create({

    // Footer
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    logo: {
        width: "10%",
        height: "10%",
        alignSelf: 'center',
        justifyContent: 'center',
        resizeMode:"contain"
    },
    TextInputSpace: {
        flex: 1,
        margin: 10,
    },
    textInput_form: {
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 10,
        margin: 10,
        height: 65,
        marginBottom: 1,
        color: '#FFF',
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#F1F1F1',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1
        },
        customBtnBGGmail: {
            backgroundColor: '#EB2D56',
            paddingHorizontal: 30,
            paddingVertical: 5,
            borderRadius: 30,
            margin: 10,
            height: 53,
            flexDirection: 'row',
            justifyContent: 'center'
        },
        customBtnBGTextGmail: {
            fontSize: 20,
            fontWeight: '400',
            color: '#fff',
            textAlign: 'center',
            marginTop: 5
        },
        customBtnBGFb: {
            backgroundColor: '#5C95EB',
            paddingHorizontal: 30,
            paddingVertical: 5,
            borderRadius: 30,
            margin: 10,
            height: 53,
            flexDirection: 'row',
            justifyContent: 'center'
        },
        customBtnBGTextFb: {
            fontSize: 20,
            fontWeight: '400',
            color: '#fff',
            textAlign: 'center',
            marginTop: 5
        }

});