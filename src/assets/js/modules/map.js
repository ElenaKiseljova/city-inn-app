import { Loader } from 'google-maps';
import styles from '@/assets/js/modules/mapStyles';

const mapInit = (
  google,
  options = { lat: 49.81173756211972, lng: 24.141566493630982 },
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

    new google.maps.Map(mapEl, fullOptions);

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
