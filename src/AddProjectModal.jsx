import { useState } from "react";
import styles from "./AddProjectModal.module.css";

export default function AddProjectModal({ toggleModal, addNewProject }) {
  //create state variable for each new project key/value pair
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [lead, setLead] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [size, setSize] = useState("");
  const [utility, setUtility] = useState("");

  const handleSubmit = (e) => {
    //prevent page from refreshing
    e.preventDefault();

    const newProject = {
      id: Date.now(),
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

    console.log("Form submitted");
    addNewProject(newProject);
    toggleModal();
  };

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.overlay}>
          <div className={styles.modalContent}>
            <h1>Add a New Project</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="proj_name">Project Name</label>
              <input
                type="text"
                name="proj_name"
                id="proj_name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              <br />
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
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="planning">Planning</option>
                <option value="dev">Development</option>
                <option value="construction">Construction</option>
                <option value="op">Operational</option>
                <option value="dec">Decommissioning</option>
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
              <button onClick={toggleModal}>Cancel</button>
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
