import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BOOKINGS, Booking } from '../data';

export type BookingDraft = {
  teacher: string;
  pkg: string;
  dur: string;
  date: string;
  time: string;
  mode: string;
  lesson: number;
  service: number;
  travel: number;
  total: number;
} | null;

type Ctx = {
  sym: string;
  fav: Set<string>;
  toggleFav: (id: string) => void;
  booking: BookingDraft;
  setBooking: (b: BookingDraft) => void;
  confirmBooking: () => void;
  bookings: Booking[];
};

const AppCtx = createContext<Ctx | null>(null);
let _uid = 100;

export function AppProvider({ children }: { children: ReactNode }) {
  const [sym] = useState('RM'); // currency — RM per the source-of-truth note
  const [fav, setFav] = useState<Set<string>>(new Set(['nisha', 'meera']));
  const [booking, setBooking] = useState<BookingDraft>(null);
  const [bookings, setBookings] = useState<Booking[]>(BOOKINGS.slice());

  const toggleFav = (id: string) =>
    setFav((p) => {
      const n = new Set(p);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const confirmBooking = () => {
    if (!booking) return;
    const nb: Booking = {
      id: 'b' + _uid++,
      teacher: booking.teacher,
      pkg: booking.pkg,
      dur: booking.dur,
      date: booking.date,
      time: booking.time,
      mode: booking.mode,
      status: 'pending',
      price: booking.total,
      when: 'upcoming',
    };
    setBookings((prev) => [nb, ...prev]);
  };

  return (
    <AppCtx.Provider value={{ sym, fav, toggleFav, booking, setBooking, confirmBooking, bookings }}>
      {children}
    </AppCtx.Provider>
  );
}

export function useApp() {
  const c = useContext(AppCtx);
  if (!c) throw new Error('useApp must be used within AppProvider');
  return c;
}
