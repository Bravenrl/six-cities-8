import { useEffect, useRef } from 'react';
import useMap from '../../hooks/useMap';
import { CityType, MapStyleType, OfferType } from '../../types/offer';
import 'leaflet/dist/leaflet.css';
import { Icon, LayerGroup, Marker } from 'leaflet';
import { AppRoute, Cities, PageType } from '../../const';
import browserHistory from '../../browser-history';
import { generatePath } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentId } from '../../store/user-process/selectors';


type MapProrsType = {
  offers: OfferType[];
  pageType: string;
  city: string;
}

const CustomIcon = {
  DEFAULT: 'img/pin.svg',
  CURRENT: 'img/pin-active.svg',
};

const defaultCustomIcon = new Icon({
  iconUrl: CustomIcon.DEFAULT,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: CustomIcon.CURRENT,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

const getStyleByPageName = (pageType: string): MapStyleType | Omit<MapStyleType, 'margin'> => {
  switch (pageType) {
    case PageType.Main:
      return { height: '550px', width: '512px' };
    default:
      return { height: '579px', width: '1144px', margin: 'auto' };
  }
};

function Map({ offers, pageType, city }: MapProrsType): JSX.Element {
  const selectedId = useSelector(getCurrentId);
  const currentCity = Cities.get(city) as CityType;
  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCity);


  useEffect(() => {
    const markersGroup = new LayerGroup();
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        const onMarkerClickHandler = (): void => {
          const linkPath = generatePath(AppRoute.RoomProprety, { id: offer.id });
          browserHistory.push(linkPath);
        };

        marker.addEventListener('click', onMarkerClickHandler);
        marker
          .setIcon(
            selectedId !== undefined && offer.id === selectedId
              ? currentCustomIcon
              : defaultCustomIcon,
          );
        markersGroup.addLayer(marker);
      });
      markersGroup.addTo(map);
    }
    return () => {
      markersGroup.remove();
    };
  }, [map, offers, selectedId]);

  useEffect(() => {
    const { latitude, longitude, zoom } = currentCity.location;
    if (map) {
      map.flyTo([latitude, longitude], zoom);
    }
  }, [currentCity, map]);

  return (
    <section className={`${pageType}__map map`}
      style={getStyleByPageName(pageType)}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
