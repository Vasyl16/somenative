import { useState, useEffect } from "react";
import {  Text, View, StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';



/* -- COMPONENTS --  */
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton.component";
import TextInstruction from "../components/ui/TextInstruction";
import GuessLogoItem from "../components/game/GuessLogItem";


/* --- Generate Random Number --  */
const generateRandomBetween = (min,max,exclude) => {
  const rndNumb = Math.floor(Math.random() * (max-min)) + min;

  if(rndNumb == exclude) {
    return generateRandomBetween(min, max, exclude);
  }else{
    return rndNumb;
  }
}

let minBoundary=1;
let maxBoundary=100;

const GameScreen = ({ userNumber, onGameOver }) => {

    const initialGuess = generateRandomBetween(1,100,userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);
    const { width, height } = useWindowDimensions();


    /* -- When is gameover -- */
    useEffect(() => {
      if(currentGuess == userNumber){
        onGameOver(guessRounds.length);
      }
    },[currentGuess, userNumber, onGameOver]);


    /* --- Set bondary same -- */
    useEffect(() => {
      minBoundary=1;
      maxBoundary=100;
    },[]);


    /* -- GuessHandler - geater or lower -- */
    const nextGuessHandler = (direction) => {
        /* -- if user lies about greater or higher -- */
        if(
            (direction === "lower" && currentGuess < userNumber) || 
            (direction === "greater" && currentGuess > userNumber)
        ){
            Alert.alert('Dont lie', 'This is wrong..', [
                {text:'Sorry!', style:'cancel'}
            ]);
            return;
        }

      if(direction === "lower"){
        maxBoundary = currentGuess;
      }else{
        minBoundary = currentGuess + 1;
      }
      const newRndNumb = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
      setCurrentGuess(newRndNumb);
      setGuessRounds(prevGuessRounds => [newRndNumb, ...prevGuessRounds]);

    }

    const guessRoundsListLength = guessRounds.length;

    let content = (
      <>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <TextInstruction style={styles.instructionText}>Higher or Lower?</TextInstruction>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                      <Ionicons name='remove' size={24} color='white'/>
                    </PrimaryButton>  
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="add" size={24} color='white' />
                    </PrimaryButton>
                </View>
            </View>
        </Card>
      </>
    );

    if(width > 500){
      content = (
        <>
          <View style={styles.buttonsContainerWide}>
              <View style={styles.buttonContainer}>
                  <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name='remove' size={24} color='white'/>
                  </PrimaryButton>  
              </View>
              <NumberContainer>{currentGuess}</NumberContainer>
              <View style={styles.buttonContainer}>
                  <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                      <Ionicons name="add" size={24} color='white' />
                  </PrimaryButton>
              </View>
          </View>
        </>
      )
    }

    return ( 
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
              {content}
            <View style={styles.listContainer}>
                <FlatList 
                  data={guessRounds} 
                  renderItem={(itemData) => 
                    <GuessLogoItem 
                      roundNumber={guessRoundsListLength - itemData.index}
                      guess={itemData.item} 
                    />}
                  keyExtractor = {(item) => item}
                />
            </View>
        </View>
     );
}
 
export default GameScreen;

/* -- STYLES -- */
const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:12,
        alignItems:'center'
    },
    instructionText:{
      marginBottom:12
    },
    buttonsContainer: {
      flexDirection: 'row',
    },
    buttonContainer: {
      flex: 1,
    },
    buttonsContainerWide:{
      flexDirection:'row',
      alignItems:'center'
    },
    listContainer:{
      flex:1,
      padding:16,

    }
})