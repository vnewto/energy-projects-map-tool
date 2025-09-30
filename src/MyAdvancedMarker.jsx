import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

//function that maps over projects and pulls the location of each one and sets that as the position of each advanced marker

export default function MyAdvancedMarker({
  position,
  selectedProject,
  setSelectedProject,
  handleClickMarker,
  project,
}) {
  return (
    <AdvancedMarker
      position={position}
      onClick={() => handleClickMarker(project)}
      project={project}
    >
      <Pin
        background={"#0f9d58"}
        borderColor={"#006425"}
        glyphColor={"#60d98f"}
      />
    </AdvancedMarker>
  );
}
