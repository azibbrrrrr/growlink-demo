import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList, TabParamList } from './types';
import { BottomNav } from '../components/BottomNav';
import { C } from '../theme';

import HomeScreen from '../screens/Home';
import MyBookingsScreen from '../screens/MyBookings';
import ChatsScreen from '../screens/Chats';
import ProfileScreen from '../screens/Profile';
import WelcomeScreen from '../screens/Welcome';
import SearchScreen from '../screens/Search';
import MapScreen from '../screens/Map';
import ListScreen from '../screens/List';
import FiltersSheet from '../screens/Filters';
import TeacherProfile from '../screens/Teacher';
import AllReviews from '../screens/Reviews';
import ActivityScreen from '../screens/Activity';
import BookingScreen from '../screens/Booking';
import PaymentScreen from '../screens/Payment';
import ConfirmedScreen from '../screens/Confirmed';
import BookingDetailScreen from '../screens/BookingDetail';
import ReviewScreen from '../screens/Review';
import ChatThreadScreen from '../screens/ChatThread';
import SettingsScreen from '../screens/Settings';

const Tab = createBottomTabNavigator<TabParamList>();
function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <BottomNav {...props} />}>
      <Tab.Screen name="Explore" component={HomeScreen} />
      <Tab.Screen name="Bookings" component={MyBookingsScreen} />
      <Tab.Screen name="Chats" component={ChatsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: C.app } }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Filters" component={FiltersSheet} options={{ presentation: 'transparentModal', animation: 'fade' }} />
      <Stack.Screen name="Teacher" component={TeacherProfile} />
      <Stack.Screen name="Reviews" component={AllReviews} />
      <Stack.Screen name="Activity" component={ActivityScreen} />
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Confirmed" component={ConfirmedScreen} options={{ animation: 'fade', gestureEnabled: false }} />
      <Stack.Screen name="BookingDetail" component={BookingDetailScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="ChatThread" component={ChatThreadScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
