import  { useMemo } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Circle,
  Marker,
} from "@react-google-maps/api";

// Estação base
const latitude = -13.2597;
const longitude = -43.4206;

const colors = [
  '#FF0000', '#FF4500', '#FFA500', '#FFFF00',
  '#ADFF2F', '#00FF00', '#008000', '#0000FF',
  '#1E90FF', '#00BFFF', '#87CEFA', '#ADD8E6',
  '#B0E0E6', '#AFEEEE'
];

const distances = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // km
const angles = [0, 180, 60, 90, 120, 150, 190, 210, 240, 270];

// Calcula o ponto final com base em distância e ângulo
function getDestinationPoint(lat: number, lng: number, distanceKm: number, bearingDegrees: number) {
  const R = 6371;
  const bearing = (Math.PI / 180) * bearingDegrees;
  const dOverR = distanceKm / R;

  const φ1 = (Math.PI / 180) * lat;
  const λ1 = (Math.PI / 180) * lng;

  const φ2 = Math.asin(Math.sin(φ1) * Math.cos(dOverR) + Math.cos(φ1) * Math.sin(dOverR) * Math.cos(bearing));
  const λ2 = λ1 + Math.atan2(
    Math.sin(bearing) * Math.sin(dOverR) * Math.cos(φ1),
    Math.cos(dOverR) - Math.sin(φ1) * Math.sin(φ2)
  );

  return {
    lat: (180 / Math.PI) * φ2,
    lng: (180 / Math.PI) * λ2,
  };
}

type SignalStrengthMapProps = {
  losses: number[]; // valores já calculados, um para cada distância
};

export function SignalStrengthMap({ losses }: SignalStrengthMapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY,
  });

  const center = { lat: latitude, lng: longitude };

  const labelPoints = useMemo(() => {
    return distances.map((d, i) => {
      const pos = getDestinationPoint(latitude, longitude, d, angles[i % angles.length]);
      return {
        ...pos,
        label: `-${losses[i].toFixed(1)} dBm`,
      };
    });
  }, [losses]);

  if (!isLoaded) return <p>Carregando mapa...</p>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100vh" }}
      center={center}
      zoom={14}
    >
      <Marker position={center}  />

      {distances.map((d, i) => (
        <Circle
          key={i}
          center={center}
          radius={d * 1000}
          options={{
            fillColor: colors[i],
            fillOpacity: 0.10,
            strokeColor: colors[i],
            strokeOpacity: 0.3,
            strokeWeight: 2,
          }}
        />
      ))}

      {labelPoints.map((point, i) => (
        <Marker
          key={`label-${i}`}
          position={{ lat: point.lat, lng: point.lng }}
          icon={{
            url: `data:image/svg+xml;utf-8,
              <svg xmlns='http://www.w3.org/2000/svg' width='150' height='30'>
                <rect x='0' y='0' width='150' height='30' fill='white' opacity='0.7' rx='5'/>
                <text x='75' y='20' text-anchor='middle' font-size='14' fill='black' font-weight='bold'>${point.label}</text>
              </svg>`,
            scaledSize: new window.google.maps.Size(150, 30),
            anchor: new window.google.maps.Point(75, 15),
          }}
        />
      ))}
    </GoogleMap>
  );
}
