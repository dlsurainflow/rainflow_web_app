import L from 'leaflet';

export const MarkerIcon = (props) =>{

    const icon = L.Icon.extend({
        options: {
          iconUrl: require('../assets/markers/1-1-01.png'),
          iconRetinaUrl: require('../assets/markers/1-1-01.png'),
          iconAnchor: null,
          popupAnchor: null,
          shadowUrl: null,
          shadowSize: null,
          shadowAnchor: null,
          iconSize: new L.Point(60, 75),
          className: 'leaflet-div-icon'
        }
      });

      return(
          {icon}
      )
}

  
