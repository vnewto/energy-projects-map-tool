import styles from "./ProjectModal.module.css";

export default function UpdateProjectModal({
  toggleUpdateModal,
  updateProject,
}) {
  const handleSubmit = (e) => {
    //prevent page from refreshing
    e.preventDefault();
    updateProject();
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
              value="new project name"
              onChange={() => console.log("project name changed")}
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
