import styles from "./AddProjectModal.module.css";

export default function AddProjectModal({ toggleModal }) {
  const newProject = {
    id: Date.now(),
    location: {
      lat: 0,
      lng: 0,
    },
    proj_lead: "",
    proj_name: "",
    proj_status: "",
    system_size: 0,
    utility: "",
  };

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.overlay}>
          <div className={styles.modalContent}>
            <h1>Add a New Project</h1>
            <form>
              <label for="proj_name">Project Name</label>
              <input
                type="text"
                name="proj_name"
                value={newProject.proj_name}
              ></input>
              <br />
              <label for="lat">Latitude</label>
              <input type="text" name="lat" value={newProject.lat}></input>
              <br />
              <label for="lng">Longitude</label>
              <input type="text" name="lng" value={newProject.lng}></input>
              <br />
              <label for="system_size">System Size (MW)</label>
              <input
                type="text"
                name="system_size"
                value={newProject.system_size}
              ></input>
              <br />
              <label for="utility">Utility</label>
              <input
                type="text"
                name="utility"
                value={newProject.utility}
              ></input>
              <br />
              <label for="proj_status">Status</label>
              <select name="proj_status">
                <option value="planning">Planning</option>
                <option value="dev">Development</option>
                <option value="construction">Construction</option>
                <option value="op">Operational</option>
                <option value="dec">Decommissioning</option>
              </select>
              <br />
              <label for="proj_lead">Project Lead</label>
              <input
                type="text"
                name="proj_lead"
                value={newProject.proj_lead}
              ></input>
              <br />
            </form>
            <button onClick={toggleModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
