import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '../../types/location';
import { useEffect, useRef } from 'react';
import { BookingInfo } from '../../types/booking-info';
import useMap from '../../hooks/use-map/use-map';
import classNames from 'classnames';

const URL_MARKER_DEFAULT = '../markup/img/svg/pin-default.svg';
const URL_MARKER_ACTIVE = '../markup/img/svg/pin-active.svg';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});
const activeCustomIcon = new Icon({
  iconUrl: URL_MARKER_ACTIVE,
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

type MapProps = {
  block: 'booking' | 'contacts';
  location: Location;
  quests?: BookingInfo[];
  selectedQuest?: BookingInfo;
}

function Map({block, location, quests, selectedQuest}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap({ mapRef, location });

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      if(quests){

        quests.forEach((quest) => {
          const marker = new Marker({
            lat: quest.location.coords[0],
            lng: quest.location.coords[1]
          });

          marker
            .setIcon(
              selectedQuest && quest.id === selectedQuest.id
                ? activeCustomIcon
                : defaultCustomIcon
            )
            .addTo(markerLayer);
        });
      } else{
        const marker = new Marker({
          lat: location.coords[0],
          lng: location.coords[1]
        });

        marker
          .setIcon(defaultCustomIcon)
          .addTo(markerLayer);

      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, location.coords, quests, selectedQuest]);

  return(
    <div className={classNames({'booking-map': block === 'booking', 'contacts__map': block === 'contacts'})}>
      <div className="map">
        <div className="map__container" ref={mapRef}></div>
      </div>
      {block === 'booking' && <p className="booking-map__address">Вы&nbsp;выбрали: {location.address}</p>}
    </div>
  );
}

export default Map;
