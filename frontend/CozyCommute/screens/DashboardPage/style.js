import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    container: {
        alignItems:'center', 
        justifyContent:'center', 
        flex:1
    },
    card:{
        backgroundColor: "#FCD39D",
        marginTop: 10,
        borderRadius: 20,
        padding: 20
    },
    yellowButton: {
        backgroundColor: '#F3B345',
        padding: 20,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
        marginBottom: 20
    },
    buttonText:{
        fontSize: 20,
        color: '#FBF5E0'

    },
    title:{
        marginTop: 30,
        fontSize: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    rowText: {
        marginLeft: 10
    }
})