import { Loader } from 'google-maps';
import styles from '@/assets/js/modules/mapStyles';

const mapInit = (
  google,
  options = {
    center: { lat: 49.81173756211972, lng: 24.141566493630982 },
    zoom: 16,
  },
  mapEl
) => {
  if (mapEl) {
    const fullOptions = {
      ...options,
      panControl: false,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false,
      rotateControl: false,
      fullscreenControl: false,
      disableDefaultUI: false,
      styles,
    };

    const map = new google.maps.Map(mapEl, fullOptions);

    const { center } = options;
    const marker = new google.maps.Marker({
      position: center,
      title: 'City Inn',
      icon: {
        url: '/img/marker.png',
      },
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);

    return true;
  }

  return false;
};

const map = async (key = '', lang = 'en') => {
  const loader = new Loader(key, {
    region: lang,
    language: lang,
  });

  const google = await loader.load();

  return google;
};

export { map, mapInit };
