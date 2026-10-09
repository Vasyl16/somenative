import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const GuessLogoItem = ({roundNumber, guess}) => {
    return (
        <View style={styles.listItem}>
            <Text style={styles.itemText}>{roundNumber}</Text>
            <Text>Opponent's Guess: {guess}</Text>
        </View>
      );
}
 
export default GuessLogoItem;

const styles = StyleSheet.create({
    listItem:{
        borderColor:Colors.primary700,
        borderWidth:1,
        borderRadius:40,
        padding:12,
        marginVertical:10,
        backgroundColor:Colors.accentColor,
        flexDirection:'row',
        justifyContent: 'space-between',
        width:"100%",
        shadowColor:'black',
        shadowOffset:{width:0, height:0},
        shadowRadius:3,
        shadowOpacity:0.25,
        elevation:4
    },
    itemText:{
        fontFamily:'open-sans'
    }
})