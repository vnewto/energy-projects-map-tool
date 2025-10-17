import { useState } from "react";
import Project from "./Project";
import styles from "./ProjectsList.module.css";

export default function ProjectsList({
  projects,
  handleClickProject,
  selectedProject,
  toggleShowUpdateModal,
}) {
//variables for setting up pagination of projects list
  const [currentPage, setCurrentPage] = useState(1);
  const projsPerPage = 11;

  //pagination logic
  const indexOfLastProj = currentPage * projsPerPage;
  const indexOfFirstProj = indexOfLastProj - projsPerPage;
  const projsOnCurrentPage = projects.slice(indexOfFirstProj, indexOfLastProj);
  const totalPages = Math.ceil(projects.length / projsPerPage);

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div>
      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        <div className={styles.projContainer}>
          <ul className={styles.projectList}>
            {projsOnCurrentPage.map((project) => (
              <li key={project.id}>
                <Project
                  project={project}
                  handleClickProject={handleClickProject}
                  selectedProject={selectedProject}
                  toggleShowUpdateModal={toggleShowUpdateModal}
                ></Project>
              </li>
            ))}
          </ul>
          <div className={styles.paginationContainer}>
            <button 
              type="button"
              onClick={handlePreviousPage}
              disabled={(currentPage === 1) || (currentPage === 0)}
              className={styles.paginationBtn}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={styles.paginationBtn}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
