import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Map, TileLayer } from 'leaflet';
import { TileLayerSettings } from './use-map.const';
import { Location } from '../../types/location';
import { BookingInfo } from '../../types/booking-info';

type useMapProps = {
  mapRef: MutableRefObject<HTMLElement | null>;
  location: Location;
  quests?: BookingInfo[];
}

function useMap({ mapRef, location, quests }: useMapProps): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: location.coords[0],
          lng: location.coords[1],
        },
        zoom: quests ? 10 : 14,
      });

      const layer = new TileLayer(TileLayerSettings.url, {
        attribution: TileLayerSettings.attribution
      });

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, location, quests]);

  return map;
}

export default useMap;
