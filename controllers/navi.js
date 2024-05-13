// Import necessary modules from React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import Login from './screens/LoginScreen';
import Register from './screens/RegisterScreen';
import AddToCartScreen from './screens/AddToCartScreen';

// Create a stack navigator
const Stack = createStackNavigator();

// Function to navigate to the add-to-cart page after successful login or registration
const navigateToAddToCart = (navigation) => {
  navigation.navigate('AddToCart');
};

// Define your navigation structure
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="AddToCart" component={AddToCartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
