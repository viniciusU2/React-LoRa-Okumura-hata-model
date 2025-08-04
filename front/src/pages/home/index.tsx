import React, { useState, useEffect, useCallback } from "react";
import { api } from "../../services/api";
import {
  GoogleMap,
  Polygon,
  LoadScript,
  Marker as MarkerF,
} from "@react-google-maps/api";

import {
  MapContaniner,
  Content,
  LeftContent,
  RightContent,
  FormContent,
  InputGroup,
} from "./styles";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { setKey, fromLatLng } from 'react-geocode';


import cidadesBahia from "./geojs-29-mun.json";


export interface MapPageProps {}

type Inputs = {
  city: string;
  lat: number;
  lng: number;
  reg: string;
};



type Marker = {
  id: number;
  city: string;
  lat: number;
  lng: number;
  reg: string;
};
type Data = {
  latitude: number;
  longitude: number;
  municipio: string;
}

const position = {
  lat: -11.590824,
  lng: -41.551262,
};

export function MapPage() {
  const [mapMarkers, setMapMarkers] = useState<Marker[]>([]);
  const [mapMarkers2, setMapMarkers2] = useState<Data[]>([]);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [cityName, setCityName] = useState<string | null>(null);
  const [cityMarkers, setCityMarkers] = useState<any[]>([]);
  const iconBase = 'https://maps.google.com/mapfiles/kml/shapes/library_maps.png';

  // const [stateName, setStateName] = useState<string | null>(null); // Estado para armazenar o nome do estado/região

  setKey(import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY);

  const handleMapClick = async (ev: google.maps.MapMouseEvent) => {
    const clickedLat = ev.latLng.lat();
    const clickedLng = ev.latLng.lng();

    setLat(clickedLat);
    setLng(clickedLng);

    // Biblioteca react-geocode para obter o nome da cidade e do estado/região
    fromLatLng(clickedLat.toString(), clickedLng.toString()).then(
      (response) => {
        const addressComponents = response.results[2]?.address_components;

        for (const component of addressComponents) {
          if (component.types.includes("locality")) {
            setCityName(component.long_name);
            break; // Saia do loop assim que encontrar a cidade
          } else if (component.types.includes("administrative_area_level_2")) {
            setCityName(component.long_name);
          }
        }

        console.log(cityName);

        //setStateName(stateName || null);
      },
      (error) => {
        console.error("Erro ao buscar o nome da cidade/estado:", error);
      }
    );
    console.error(cityName);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const fetchMarkers = useCallback(async () => {
    try {
      const response = await api.get("find");
      const response2 = await api.get("CPRM");
      const markersData = response.data; // Suponha que a resposta seja uma lista de marcadores
      const markersData2 = response2.data; // Suponha que a resposta seja uma lista de marcadores
      console.log(response.data);

      setMapMarkers(markersData);
      setMapMarkers2(markersData2);
    } catch (error) {
      console.error("Erro ao buscar marcadores:", error);
    }
  }, []);

  useEffect(() => {
    fetchMarkers();
  }, [fetchMarkers]);

  useEffect(() => {
    const polygons = cidadesBahia.features.map((feature: any) => {
      const coordinates = feature.geometry.coordinates[0].map((coord: any) => ({
        lat: coord[1], // Latitude
        lng: coord[0], // Longitude
      }));

      return {
        name: feature.properties.name, // Nome da cidade
        coordinates: coordinates,
      };
    });
    setCityMarkers(polygons);
  }, []);

  const onSubmit = useCallback(
    async (data: Inputs) => {
      console.log(data);
      try {
        await api.post("set", data); // Envie os dados para o backend
        fetchMarkers(); // Atualize a lista de marcadores após adicionar um novo
        alert("Marcador adicionado com sucesso!");
      } catch (error) {
        console.error("Erro ao enviar requisição:", error);
      }
    },
    [fetchMarkers]
  );

  return (
    <Content>
      <LeftContent>
        <FormContent onSubmit={handleSubmit(onSubmit)}>
          <h2>Registrar local</h2>
          <InputGroup>
            <input
              {...register("city")}
              placeholder="Cidade"
              value={cityName !== null ? cityName : ""}
            />
            {errors?.city && <p>{errors.city.message}</p>}
          </InputGroup>
          <InputGroup>
            <input
              {...register("reg")}
              type="text"
              placeholder="região"
              required
            />
          </InputGroup>
          <InputGroup>
            <input
              {...register("lat")}
              placeholder="latitude"
              value={lat !== null ? lat.toFixed(10) : ""}
              onChange={() => {}}
              required
            />
          </InputGroup>
          <InputGroup>
            <input
              {...register("lng")}
              placeholder="longitude"
              value={lng !== null ? lng.toFixed(10) : ""}
              onChange={() => {}}
              required
            />
          </InputGroup>
          <button type="submit" >Registrar</button>
        </FormContent>
      </LeftContent>

      <RightContent>
        <MapContaniner>
          <LoadScript
            googleMapsApiKey={import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY}
            libraries={["places"]}
          >
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={position}
              zoom={15}
              onClick={handleMapClick}
            >
              {mapMarkers.map((marker) => (
                <MarkerF
                  key={marker.id}
                  position={{ lat: marker.lat, lng: marker.lng }}
                />
              ))}
              {mapMarkers2.map((marker) => (
                <MarkerF
                  position={{ lat: marker.latitude, lng: marker.longitude }}
                  onLoad={marker => {
                    const customIcon = (opts) => Object.assign({
                      path: 'M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z',
                      fillColor: '#34495e',
                      fillOpacity: 1,
                      strokeColor: '#000',
                      strokeWeight: 1,
                      scale: 1,
                    }, opts);
        
                    marker.setIcon(customIcon({
                      fillColor: 'green',
                      strokeColor: 'white'
                    }));
                    
                  }}
                  
           
            
                />
              ))}

              {cityMarkers.map((city, index) => (
                <Polygon
                  onClick={handleMapClick}
                  key={index}
                  paths={city.coordinates}
                  options={{
                    fillColor: "blue",
                    fillOpacity: 0.03,
                    strokeColor: "blue",
                    strokeOpacity: 0.3,
                    strokeWeight: 2,
                  }}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </MapContaniner>
      </RightContent>
    </Content>
  );
}
