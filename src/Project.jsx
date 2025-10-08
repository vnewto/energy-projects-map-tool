import styles from "./Project.module.css";
import UpdateProjectModal from "./UpdateProjectModal";

export default function Project({
  project,
  handleClickProject,
  selectedProject,
  toggleUpdateModal,
}) {
  return (
    <div onClick={() => handleClickProject(project)}>
      <div className={styles.projContainer}>
        <div>
          <p>{project.proj_name}</p>
        </div>
        <div>
          {/* if project id matches the id of the selected project, then render buttons */}
          {selectedProject && selectedProject.id === project.id && (
            <div>
              <button type="button" onClick={toggleUpdateModal}>
                Edit
              </button>
              <button type="button">Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
