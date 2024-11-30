"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { setSelectedPosition } from "@/store/map/map";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

export function MapView() {
  const dispatch = useDispatch();
  const { positions, selectedPosition } = useSelector((state) => state.map);

  useEffect(() => {
    const container = L.DomUtil.get("map");
    if (container != null) {
      container._leaflet_id = null;
    }

    const selectedCoords = positions.find(
      (pos) => pos.id === selectedPosition
    )?.coords;

    const map = L.map("map").setView(selectedCoords || [0, 0], 13);

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        // attribution:
        //   'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoidGFyLWhlbCIsImEiOiJjbDJnYWRieGMwMTlrM2luenIzMzZwbGJ2In0.RQRMAJqClc4qoNwROT8Umg",
      }
    ).addTo(map);

    L.Marker.prototype.options.icon = DefaultIcon;

    if (selectedCoords) {
      const marker = L.marker(selectedCoords).addTo(map);
      marker
        .bindPopup(
          `<b>${positions.find((pos) => pos.id === selectedPosition)?.name}</b>`
        )
        .openPopup();
    }
  }, [positions, selectedPosition]);

  const handlePositionChange = (id: number) => {
    dispatch(setSelectedPosition(id));
  };

  return (
    <div>
      {/* Selector para cambiar la posición */}
      <div className="flex gap-4 p-4 ">
        {positions.map((pos) => (
          <button
            key={pos.id}
            onClick={() => handlePositionChange(pos.id)}
            className={`px-4 py-2 rounded ${
              selectedPosition === pos.id
                ? "bg-green-500 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {pos.name}
          </button>
        ))}
      </div>

      {/* Contenedor del mapa */}
      <div id="map" style={{ height: "80vh", width: "100%" }}></div>
    </div>
  );
}
