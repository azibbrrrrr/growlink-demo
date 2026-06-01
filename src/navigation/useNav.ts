import { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';

/**
 * Thin adapter that maps the design prototype's nav API
 * (nav.push / pop / replace / tab / resetTo) onto React Navigation,
 * so screens port over with minimal change.
 */
const ROUTE: Record<string, string> = {
  search: 'Search', map: 'Map', list: 'List', filters: 'Filters', teacher: 'Teacher',
  reviews: 'Reviews', activity: 'Activity', booking: 'Booking', payment: 'Payment',
  confirmed: 'Confirmed', bookingDetail: 'BookingDetail', review: 'Review',
  chatThread: 'ChatThread', settings: 'Settings',
};
const TAB: Record<string, string> = { explore: 'Explore', bookings: 'Bookings', chats: 'Chats', profile: 'Profile' };

export function useNav() {
  const navigation = useNavigation<any>();
  return useMemo(
    () => ({
      push: (screen: string, params?: object) => navigation.navigate(ROUTE[screen] ?? screen, params),
      pop: () => {
        if (navigation.canGoBack()) navigation.goBack();
      },
      replace: (screen: string, params?: object) =>
        typeof navigation.replace === 'function'
          ? navigation.replace(ROUTE[screen] ?? screen, params)
          : navigation.navigate(ROUTE[screen] ?? screen, params),
      tab: (key: string) => navigation.navigate('Main', { screen: TAB[key] ?? 'Explore' }),
      resetTo: (key: string) => {
        if (key === 'welcome') {
          // climb to the root stack (from a tab screen `navigation` is the tab navigator)
          const target = navigation.getParent() ?? navigation;
          target.reset({ index: 0, routes: [{ name: 'Welcome' }] });
        } else {
          navigation.navigate('Main', { screen: TAB[key] ?? 'Explore' });
        }
      },
    }),
    [navigation],
  );
}

export type Nav = ReturnType<typeof useNav>;
