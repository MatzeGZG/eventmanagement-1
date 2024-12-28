import React, { createContext, useContext, useState } from 'react';

interface MapContextType {
  currentView: 'events' | 'users';
  setCurrentView: (view: 'events' | 'users') => void;
  selectedItem: any | null;
  setSelectedItem: (item: any | null) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<'events' | 'users'>('events');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  return (
    <MapContext.Provider value={{
      currentView,
      setCurrentView,
      selectedItem,
      setSelectedItem
    }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
};