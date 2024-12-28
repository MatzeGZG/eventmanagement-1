```typescript
import React from 'react';
import { MapPin, Shield } from 'lucide-react';
import { useUserLocation } from '../../features/location/hooks/useUserLocation';

export const LocationSettings: React.FC = () => {
  const {
    location,
    preferences,
    loading,
    error,
    toggleLocationSharing,
    updateLocation
  } = useUserLocation();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <MapPin className="w-6 h-6 text-indigo-600 mr-2" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Location Settings</h3>
            <p className="text-sm text-gray-600">Manage your location preferences</p>
          </div>
        </div>
        <Shield className="w-6 h-6 text-gray-400" />
      </div>

      <div className="space-y-6">
        {/* Location Sharing Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Share Location</h4>
            <p className="text-sm text-gray-600">
              Allow the app to use your location for better event recommendations
            </p>
          </div>
          <button
            onClick={() => toggleLocationSharing(!preferences?.shareLocation)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              preferences?.shareLocation ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                preferences?.shareLocation ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Current Location */}
        {location?.enabled && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Current Location</span>
              <button
                onClick={updateLocation}
                disabled={loading}
                className="text-sm text-indigo-600 hover:text-indigo-700"
              >
                {loading ? 'Updating...' : 'Update'}
              </button>
            </div>
            <div className="text-sm text-gray-600">
              {location.coordinates.latitude.toFixed(6)}, {location.coordinates.longitude.toFixed(6)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Last updated: {new Date(location.lastUpdated).toLocaleString()}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Privacy Notice */}
        <div className="text-xs text-gray-500 flex items-start">
          <Shield className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
          <p>
            Your location data is only used to enhance your event discovery experience.
            You can disable location sharing at any time.
          </p>
        </div>
      </div>
    </div>
  );
};
```