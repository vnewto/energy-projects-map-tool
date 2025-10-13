import Project from "./Project";
import styles from "./ProjectsList.module.css";

export default function ProjectsList({
  projects,
  handleClickProject,
  selectedProject,
  toggleUpdateModal,
  currentPage,
  setCurrentPage,
  projsPerPage,
}) {
  //pagination logic
  const indexOfLastProj = currentPage * projsPerPage;
  const indexOfFirstProj = indexOfLastProj - projsPerPage;
  const currentProjs = projects.slice(indexOfFirstProj, indexOfLastProj);
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
      {currentProjs === 0 ? (
        <p>Add a project above to get started</p>
      ) : (
        <div className={styles.projContainer}>
          <ul className={styles.projList}>
            {currentProjs.map((project) => (
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
