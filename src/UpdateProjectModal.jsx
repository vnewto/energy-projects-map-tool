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
      <div className={styles.overlay} onClick={toggleUpdateModal}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <h1>Edit Project</h1>
          <form onSubmit={handleSubmit} className={styles.projForm}>
            <label htmlFor="proj_name">Project Name</label>
            <input
              type="text"
              name="proj_name"
              id="proj_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <label htmlFor="lat">Latitude</label>
            <input
              type="number"
              name="lat"
              id="lat"
              required
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            ></input>
            <br />
            <label htmlFor="lng">Longitude</label>
            <input
              type="number"
              name="lng"
              id="lng"
              required
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
            ></input>
            <br />
            <label htmlFor="system_size">System Size (MW)</label>
            <input
              type="number"
              name="system_size"
              id="system_size"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            ></input>
            <br />
            <label htmlFor="utility">Utility</label>
            <input
              type="text"
              name="utility"
              id="utility"
              value={utility}
              onChange={(e) => setUtility(e.target.value)}
            ></input>
            <br />
            <label htmlFor="proj_status">Status</label>
            <select
              name="proj_status"
              id="proj_status"
              value={status}
              onChange={(e) => {
                console.log("status changed");
                setStatus(e.target.value);
                console.log("e.target.value: ", e.target.value);
              }}
            >
              <option value="Planning">Planning</option>
              <option value="Development">Development</option>
              <option value="Construction">Construction</option>
              <option value="Operational">Operational</option>
              <option value="Decommissioning">Decommissioning</option>
            </select>
            <br />
            <label htmlFor="proj_lead">Project Lead</label>
            <input
              type="text"
              name="proj_lead"
              id="proj_lead"
              value={lead}
              onChange={(e) => setLead(e.target.value)}
            ></input>
            <br />

            <button onClick={toggleUpdateModal}>Cancel</button>
            <button type="submit">Update</button>
          </form>
          <br />
        </div>
      </div>
    </div>
  );
}
