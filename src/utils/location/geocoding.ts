import { Location, LocationSearchResult } from '../../types/location';
import { secureRequest } from '../api/secureRequest';

export class GeocodingService {
  private static readonly MAPBOX_API = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
  
  static async geocodeAddress(address: string): Promise<LocationSearchResult[]> {
    const token = import.meta.env.VITE_MAPBOX_TOKEN;
    if (!token) throw new Error('Mapbox token not configured');

    const response = await secureRequest<any>(
      `${this.MAPBOX_API}/${encodeURIComponent(address)}.json?access_token=${token}`,
      { service: 'mapbox' }
    );

    return response.features.map((feature: any) => ({
      location: {
        coordinates: {
          longitude: feature.center[0],
          latitude: feature.center[1]
        },
        formattedAddress: feature.place_name,
        address: feature.place_name,
        placeId: feature.id,
        city: this.extractCity(feature),
        country: this.extractCountry(feature)
      },
      confidence: feature.relevance,
      types: feature.place_type
    }));
  }

  private static extractCity(feature: any): string {
    const place = feature.context?.find((c: any) => c.id.startsWith('place'));
    return place?.text || '';
  }

  private static extractCountry(feature: any): string {
    const country = feature.context?.find((c: any) => c.id.startsWith('country'));
    return country?.text || '';
  }
}