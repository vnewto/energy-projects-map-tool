import { APIProvider, Map } from "@vis.gl/react-google-maps";
import MyAdvancedMarker from "./MyAdvancedMarker";
import MyInfoWindow from "./MyInfoWindow";

export default function MyMap({
  projects,
  selectedProject,
  handleClickProject,
}) {

  const default_center = {
    location: {
      lat: 37.09024,
      lng: -95.712891,
    },
    zoom: 3.7,
  };

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
                project={project}
                handleClickProject={handleClickProject}
              ></MyAdvancedMarker>
            );
          })}
          {selectedProject && (
            <MyInfoWindow project={selectedProject}></MyInfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
