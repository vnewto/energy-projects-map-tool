import { InfoWindow } from "@vis.gl/react-google-maps";
import EditProjBtn from "../shared/EditProjBtn";
import styles from "./MyInfoWindow.module.css";

export default function MyInfoWindow({
  project,
  setSelectedProject,
  toggleShowUpdateModal,
}) {
  console.log("project: ", project);

  return (
    <InfoWindow
      position={project.location}
      onClose={() => setSelectedProject("")}
      className={styles.infoWindow}
    >
      <h2>{project.proj_name}</h2>
      <p>
        System Size:{" "}
        <span className={styles.infoWindowField}>{project.system_size} MW</span>
      </p>
      <p>
        Utility:{" "}
        <span className={styles.infoWindowField}>{project.utility}</span>
      </p>
      <p>
        Status:{" "}
        <span className={styles.infoWindowField}>{project.proj_status}</span>
      </p>
      <p>
        Project Lead:{" "}
        <span className={styles.infoWindowField}>{project.proj_lead}</span>
      </p>
      <div className={styles.btnContainer}>
          <EditProjBtn toggleShowUpdateModal={toggleShowUpdateModal} />
      <button className={styles.closeBtn} type='button' onClick={() => setSelectedProject('')}>Close</button>
      </div>
      
    </InfoWindow>
  );
}
