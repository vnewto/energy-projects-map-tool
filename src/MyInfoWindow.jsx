import { InfoWindow } from "@vis.gl/react-google-maps";

export default function MyInfoWindow({ project }) {
  return (
    <InfoWindow position={project.location}>
      <h1>{project.proj_name}</h1>
      <p>
        <span>System Size: </span>
        {project.system_size}
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
