"use client";

import { createContext, useContext, useState, useMemo } from "react";

const RoomContext = createContext(null);

const ROOM_MAP = {
  "9876543210": ["206", "207", "208", "302"],
  "1234567890": ["302"],
};

export function RoomProvider({ children }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [phone, setPhone] = useState(null);

  const bookedRooms = useMemo(() => {
    if (!phone) return [];
    return ROOM_MAP[phone] || [];
  }, [phone]);

  const isMultipleRooms = bookedRooms.length > 1;

  const value = useMemo(
    () => ({
      selectedRoom,
      setSelectedRoom,
      bookedRooms,
      isMultipleRooms,
      phone,
      setPhone,
    }),
    [selectedRoom, bookedRooms, isMultipleRooms, phone],
  );

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
}

export function useRoom() {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
}
