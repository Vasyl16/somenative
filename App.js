import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';


/* --- COMPONENTS --- */
import StartGameScreeen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/colors';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const[userNumber, setUserNumber] = useState();
  const[gameIsOver, setGameIsOver] = useState(true);
  const[guessRounds, setGuessRounds] = useState(0);


  /* -- Font Family -- */
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

  useEffect(() => {
    if(fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if(!fontsLoaded) {
    return null;
  }


  /* -- PICKED NEW NUBMER -- */
  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }


  /* -- GAME OVER HANLDER -- */
  const gameOverHandler = (numberOfRounds) => {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds)
  }

  const startNewGameHandler = () => {
      setUserNumber(0);
      setGuessRounds(0);
  }

  let screen = <StartGameScreeen onPickNumber={pickedNumberHandler} />;

  if(userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} /> ;
  }

  if(gameIsOver && userNumber) {
    screen = <GameOverScreen 
                userNumber={userNumber} 
                roundsNumber={guessRounds} 
                onStartNewGame={startNewGameHandler} 
              />
  }


  return (
    <SafeAreaProvider>
      <StatusBar style='light' />
      <LinearGradient colors={[Colors.primary700,Colors.accentColor]} style={styles.rootScreen}>
        <ImageBackground 
          source={require('./assets/images/background.png')} 
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
          
        </ImageBackground>
      </LinearGradient>
    </SafeAreaProvider>
  );
}


/* -- STYLES -- */
const styles = StyleSheet.create({
  rootScreen:{
    flex:1,
  },
  backgroundImage:{
    opacity:0.15
  }
});
