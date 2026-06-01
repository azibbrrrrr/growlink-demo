export type TabParamList = {
  Explore: undefined;
  Bookings: undefined;
  Chats: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Welcome: undefined;
  Main: { screen?: keyof TabParamList } | undefined;
  Search: undefined;
  Map: undefined;
  List: { cat?: string } | undefined;
  Filters: undefined;
  Teacher: { id: string };
  Reviews: { id: string };
  Activity: undefined;
  Booking: { id: string; pkgId?: string };
  Payment: undefined;
  Confirmed: undefined;
  BookingDetail: { id: string };
  Review: { id: string };
  ChatThread: { id: string };
  Settings: undefined;
};
