import AddProjectModal from "../features/AddProjectModal";
import UpdateProjectModal from "../features/UpdateProjectModal";
import styles from "./MapPage.module.css";
import FilterOptions from "../features/FilterOptions";
import MyMap from "../features/MyMap";
import ProjectsList from "../features/ProjectsList";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlug } from "@fortawesome/free-solid-svg-icons";

export default function MapPage({
  showAddModal,
  toggleShowAddModal,
  showUpdateModal,
  toggleShowUpdateModal,
  addNewProject,
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
  loading,
}) {
  if (loading) {
    return <h3>Loading...</h3>;
  } else
    return (
      <div className={styles.mapPageContainer}>
        {/* add new Project Modal */}
        {showAddModal && (
          <AddProjectModal
            toggleShowAddModal={toggleShowAddModal}
            addNewProject={addNewProject}
            showAddModal={showAddModal}
          />
        )}
        {/* Update Project Modal */}
        {showUpdateModal && (
          <UpdateProjectModal
            toggleShowUpdateModal={toggleShowUpdateModal}
            updateProject={updateProject}
            selectedProject={selectedProject}
            showUpdateModal={showUpdateModal}
          />
        )}

        <div className={styles.container}>
          {/* filter options and Add New Project Button */}
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
            <button className={styles.addProjBtn} onClick={toggleShowAddModal}>
              <FontAwesomeIcon icon={faPlus} className={styles.faIcon} />
              Add New Project
            </button>
          </div>
          {/* Map */}
          <div className={styles.mapContainer}>
            <MyMap
              projects={projects}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
              handleClickProject={handleClickProject}
              toggleShowUpdateModal={toggleShowUpdateModal}
            ></MyMap>
          </div>
          <h2 className={styles.projsHeader}>
            <FontAwesomeIcon icon={faPlug} />
            My Projects
          </h2>
          {/* List of Projects with Pagination component */}
          <div className={styles.projList}>
            <ProjectsList
              projects={projects}
              handleClickProject={handleClickProject}
              selectedProject={selectedProject}
              toggleShowUpdateModal={toggleShowUpdateModal}
            ></ProjectsList>
          </div>
        </div>
      </div>
    );
}
