export interface Location {
  address: string;        // Full street address
  streetNumber?: string;  // Optional specific components
  street?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  placeId?: string;      // For mapping service reference
  formattedAddress?: string; // Full formatted address from geocoding service
}

export interface LocationSearchResult {
  location: Location;
  confidence: number;     // Geocoding confidence score
  types?: string[];      // Location types (business, residence, etc)
}