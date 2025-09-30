import { APIProvider, Map } from "@vis.gl/react-google-maps";
import MyAdvancedMarker from "./MyAdvancedMarker";
import { useCallback } from "react";

export default function MyMap({
  projects,
  selectedProject,
  setSelectedProject,
}) {
  const default_center = {
    location: {
      lat: 37.09024,
      lng: -95.712891,
    },
    zoom: 3.7,
  };

  function handleClickMarker(projectID) {
    console.log("a marker has been clicked for project ", projectID);
    setSelectedProject(projectID);
  }

  // const handleClickMarker = useCallback((projectID) => setSelectedProject(projectID), [setSelectedProject])

  return (
    <div style={{ height: "75vh", width: "75vw" }}>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLEMAPS_API_KEY}>
        <Map
          defaultZoom={default_center.zoom}
          region="US"
          defaultCenter={default_center.location}
          reuseMaps={true}
          mapId={import.meta.env.VITE_GOOGLEMAPS_MAP_ID}
        >
          {projects.map((project) => {
            return (
              <MyAdvancedMarker
                key={project.id}
                position={project.location}
                handleClickMarker={handleClickMarker}
              ></MyAdvancedMarker>
            );
          })}
          ;
        </Map>
      </APIProvider>
    </div>
  );
}
