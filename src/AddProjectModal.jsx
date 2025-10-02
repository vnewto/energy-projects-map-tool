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

  const handleSubmit = (e) => {
    //prevent page from refreshing
    e.preventDefault();
    console.log("Form submitted");
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
                // value={newProject.proj_name}
              ></input>
              <br />
              <label htmlFor="lat">Latitude</label>
              <input
                type="number"
                name="lat"
                id="lat"
                required
                // value={newProject.lat}
              ></input>
              <br />
              <label htmlFor="lng">Longitude</label>
              <input
                type="number"
                name="lng"
                id="lng"
                required
                // value={newProject.lng}
              ></input>
              <br />
              <label htmlFor="system_size">System Size (MW)</label>
              <input
                type="number"
                name="system_size"
                id="system_size"
                // value={newProject.system_size}
              ></input>
              <br />
              <label htmlFor="utility">Utility</label>
              <input
                type="text"
                name="utility"
                id="utility"
                // value={newProject.utility}
              ></input>
              <br />
              <label htmlFor="proj_status">Status</label>
              <select name="proj_status" id="proj_status">
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
                // value={newProject.proj_lead}
              ></input>
              <br />
              <button onClick={toggleModal}>Cancel</button>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
