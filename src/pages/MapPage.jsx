import AddProjectModal from "../features/AddProjectModal";
import UpdateProjectModal from "../features/UpdateProjectModal";
import styles from "./MapPage.module.css";
import Project from "../features/Project";
import FilterOptions from "../features/FilterOptions";
import MyMap from "../features/MyMap";

export default function MapPage({
  projectModal,
  toggleModal,
  addNewProject,
  showUpdateModal,
  toggleUpdateModal,
  updateProject,
  selectedProject,
  projects,
  handleClickProject,
  filterField,
  setFilterField,
  filterOperator,
  setFilterOperator,
  filterValue,
  setFilterValue,
  setSelectedProject,
}) {
  return (
    <>
      {projectModal && (
        <AddProjectModal
          toggleModal={toggleModal}
          addNewProject={addNewProject}
        />
      )}
      {showUpdateModal && (
        <UpdateProjectModal
          toggleUpdateModal={toggleUpdateModal}
          updateProject={updateProject}
          selectedProject={selectedProject}
        />
      )}
      <div className={styles.container}>
        <div className={styles.mapBar}>
          <FilterOptions
            filterField={filterField}
            setFilterField={setFilterField}
            filterOperator={filterOperator}
            setFilterOperator={setFilterOperator}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            setSelectedProject={setSelectedProject}
            projects={projects}
            handleClickProject={handleClickProject}
          ></FilterOptions>

          <button className={styles.addProjBtn} onClick={toggleModal}>
            Add New Project
          </button>
        </div>
        <div className={styles.mapContainer}>
          <MyMap
            projects={projects}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            handleClickProject={handleClickProject}
          ></MyMap>
        </div>
        <h2 className={styles.projsHeader}>My Projects</h2>
        <div className={styles.projContainer}>
          <ul className={styles.projList}>
            {projects.map((project) => (
              <li key={project.id}>
                <Project
                  project={project}
                  handleClickProject={handleClickProject}
                  selectedProject={selectedProject}
                  toggleUpdateModal={toggleUpdateModal}
                ></Project>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
