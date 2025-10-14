import { useState } from "react";
import Project from "./Project";
import styles from "./ProjectsList.module.css";

export default function ProjectsList({
  projects,
  handleClickProject,
  selectedProject,
  toggleUpdateModal,
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
      {projects === 0 ? (
        <p>No projects selected</p>
      ) : (
        <div className={styles.projContainer}>
          <ul className={styles.projList}>
            {projsOnCurrentPage.map((project) => (
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
          <div>
            <button
              type="button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
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
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
