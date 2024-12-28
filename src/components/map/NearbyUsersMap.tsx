import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { User } from 'lucide-react';
import { useStore } from '../../store';
import { UserPopup } from '../user/UserPopup';
import { colors } from '../../styles/colors';

export const NearbyUsersMap: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const users = useStore((state) => state.nearbyUsers);

  return (
    <Map
      mapStyle="mapbox://styles/mapbox/dark-v11"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      initialViewState={{
        latitude: 40.7128,
        longitude: -74.006,
        zoom: 12
      }}
    >
      {users?.map((user) => (
        <Marker
          key={user.id}
          latitude={user.location.coordinates.latitude}
          longitude={user.location.coordinates.longitude}
        >
          <button
            onClick={() => setSelectedUser(user)}
            className="transform transition-transform hover:scale-110"
          >
            <div className="relative">
              {user.online && (
                <div className="absolute -right-1 -top-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
              )}
              <User className={`w-8 h-8 text-[${colors.primary.gold}]`} />
            </div>
          </button>
        </Marker>
      ))}

      {selectedUser && (
        <Popup
          latitude={selectedUser.location.coordinates.latitude}
          longitude={selectedUser.location.coordinates.longitude}
          onClose={() => setSelectedUser(null)}
          closeButton={true}
          closeOnClick={false}
          anchor="bottom"
        >
          <UserPopup user={selectedUser} />
        </Popup>
      )}
    </Map>
  );
};