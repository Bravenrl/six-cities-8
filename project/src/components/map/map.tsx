import { useEffect, useRef } from 'react';
import useMap from '../../hooks/useMap';
import { OfferType } from '../../types/offer';
import 'leaflet/dist/leaflet.css';
import { Icon, Marker } from 'leaflet';
import { useHistory } from 'react-router';
import { AppRoute } from '../../const';


type MapProrsType = {
  offers : OfferType[];
  city: string;
  selectedId: number;
  className: string;
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

function Map({offers, city, selectedId, className} :  MapProrsType) : JSX.Element {

  const offersInCity = (className==='property') ? offers: offers.filter((offer) => offer.city.name === city);
  const currentCity = offersInCity[0].city;
  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCity);
  const history = useHistory();

  useEffect(() => {
    if (map) {
      offersInCity.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        const onMarkerClickHandler = () : void => {
          history.push(`${AppRoute.RoomProprety.slice(0, -3)}${offer.id}`);
        };

        marker.addEventListener('click' , onMarkerClickHandler);
        marker
          .setIcon(
            selectedId !== undefined && offer.id === selectedId
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);

        return () => marker.removeEventListener('click' , onMarkerClickHandler);
      });
    }

  }, [map, offersInCity, selectedId, history]);

  return (
    <section className={`${className}__map map`}
      style={{height: '550px'}}
      ref = {mapRef}
    >
    </section>
  );
}

export default Map;
