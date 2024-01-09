import { useEffect } from "react";
import tw from "tailwind-styled-components";
import mapboxgl from "!mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export const Map = (props) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: [78.9629, 20.5937],
      zoom: 3,
    });

    if (props.pickupCoordinates) {
      addToMap(map, props.pickupCoordinates);
    }

    if (props.dropoffCoordinates) {
      addToMap(map, props.dropoffCoordinates);
    }

    if (props.pickupCoordinates && props.dropoffCoordinates) {
      map.fitBounds([props.pickupCoordinates, props.dropoffCoordinates], {
        padding: 60,
      });
      drawRoute(map, props.pickupCoordinates, props.dropoffCoordinates);
    }
  }, [props.pickupCoordinates, props.dropoffCoordinates]);

  const addToMap = (map, coordinates) => {
    const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
  };
  const drawRoute = async (map, start, end) => {
    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
    );
    const data = await response.json();

    const route = data.routes[0].geometry;
    map.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: route,
      },
    });
    map.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#00FF3E",
        "line-width": 7,
        "line-opacity": 0.75,
      },
    });
  };

  return <Wrapper id="map"></Wrapper>;
};

export default Map;

const Wrapper = tw.div`
    flex-1 h-1/2
`;
