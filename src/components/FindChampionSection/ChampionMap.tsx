"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { Box } from "@chakra-ui/react";
import type { Champion } from "./champions";

// Custom SVG marker in BMC green
const markerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40">
  <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.268 21.732 0 14 0z" fill="%2300A651"/>
  <circle cx="14" cy="13" r="6" fill="white"/>
</svg>`;

const ICON = L.icon({
  iconUrl: `data:image/svg+xml,${markerSvg}`,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
  popupAnchor: [0, -36],
});

interface ChampionMapProps {
  champions: Champion[];
}

export default function ChampionMap({ champions }: ChampionMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [20, 0],
      zoom: 2,
      scrollWheelZoom: false,
    });

    // CartoDB Voyager — clean, warm, light tiles
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }
    ).addTo(map);

    champions.forEach((c) => {
      const lines: string[] = [
        `<strong style="font-size:14px">${c.name}</strong>`,
        `<span style="color:#666;font-size:13px">${c.city}, ${c.state}</span>`,
      ];
      if (c.website) {
        lines.push(
          `<a href="${c.website}" target="_blank" rel="noopener" style="color:#00A651;font-size:13px">Website ↗</a>`
        );
      }

      L.marker([c.lat, c.lng], { icon: ICON })
        .addTo(map)
        .bindPopup(lines.join("<br/>"));
    });

    if (champions.length > 0) {
      const bounds = L.latLngBounds(
        champions.map((c) => [c.lat, c.lng] as [number, number])
      );
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 4 });
    }

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [champions]);

  return (
    <Box
      borderRadius="12px"
      overflow="hidden"
      border="2px solid #E0E0E0"
    >
      <div ref={containerRef} style={{ height: "350px", width: "100%" }} />
    </Box>
  );
}
