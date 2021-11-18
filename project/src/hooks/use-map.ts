import { MutableRefObject, useEffect, useState } from 'react';
import { Map, TileLayer } from 'leaflet';
import { CityType } from '../types/offer';

const LAYER_TITLE = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

function useMap(mapRef:MutableRefObject<null>, city:CityType) : Map | null {
  const [map, setMap] = useState<Map|null>(null);

  useEffect(() => {
    const {latitude, longitude, zoom} = city.location;
    if (mapRef.current !== null && map === null) {
      const instance =  new Map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: zoom,
      });

      const layer = new TileLayer(
        LAYER_TITLE,
        {
          attribution: ATTRIBUTION,
        },
      );

      instance.addLayer(layer);

      setMap(instance);

    }
  }, [mapRef, map, city]);

  return map;
}

export default useMap;
