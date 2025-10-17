import EditProjBtn from "../shared/EditProjBtn";
import styles from "./Project.module.css";

export default function Project({
  project,
  handleClickProject,
  selectedProject,
  toggleShowUpdateModal,
}) {
  return (
    <div onClick={() => handleClickProject(project)}>
      <div className={(selectedProject && selectedProject.id === project.id) ? `${styles.isSelected} ${styles.projContainer}` : `${styles.projContainer}`}>
        <div>
          <p className={styles.projectName}>{project.proj_name}</p>
        </div>
        <div>
          {/* if project id matches the id of the selected project, then render buttons */}
          {selectedProject && selectedProject.id === project.id && (
            <div>
              <EditProjBtn toggleShowUpdateModal={toggleShowUpdateModal} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
