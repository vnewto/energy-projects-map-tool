import { InfoWindow } from "@vis.gl/react-google-maps";

export default function MyInfoWindow({ project, setSelectedProject }) {
  console.log("project: ", project);

  return (
    <InfoWindow
      position={project.location}
      onClose={() => setSelectedProject("")}
    >
      <h1>{project.proj_name}</h1>
      <p>
        <span>System Size: </span>
        {project.system_size} MW
      </p>
      <p>
        <span>Utility: </span>
        {project.utility}
      </p>
      <p>
        <span>Status: </span>
        {project.proj_status}
      </p>
      <p>
        <span>Project Lead: </span>
        {project.proj_lead}
      </p>
    </InfoWindow>
  );
}
