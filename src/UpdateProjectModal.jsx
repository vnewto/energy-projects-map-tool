import { useState } from "react";
import styles from "./ProjectModal.module.css";

export default function UpdateProjectModal({
  toggleUpdateModal,
  updateProject,
  selectedProject,
}) {
  //fill in fields of modal with the preexisting project information
  //create state variable for each new project key/value pair
  const [lat, setLat] = useState(selectedProject.location.lat);
  const [lng, setLng] = useState(selectedProject.location.lng);
  const [lead, setLead] = useState(selectedProject.proj_lead);
  const [name, setName] = useState(selectedProject.proj_name);
  const [status, setStatus] = useState(selectedProject.proj_status);
  const [size, setSize] = useState(selectedProject.system_size);
  const [utility, setUtility] = useState(selectedProject.utility);

  const handleSubmit = (e) => {
    //prevent page from refreshing
    e.preventDefault();

    const updatedProject = {
      id: selectedProject.id,
      location: {
        lat: Number(lat),
        lng: Number(lng),
      },
      proj_lead: lead,
      proj_name: name,
      proj_status: status,
      system_size: Number(size),
      utility: utility,
    };

    updateProject(updatedProject);
    console.log("updatedProject: ", updatedProject);
    toggleUpdateModal();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.overlay}>
        <div className={styles.modalContent}>
          <h1>Edit Project</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="proj_name">Project Name</label>
            <input
              type="text"
              name="proj_name"
              id="proj_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <button onClick={toggleUpdateModal}>Cancel</button>
            <button type="submit">Update</button>
          </form>
          <br />
        </div>
      </div>
    </div>
  );
}
