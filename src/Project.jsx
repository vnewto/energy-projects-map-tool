export default function Project({
  project,
  handleClickProject,
  selectedProject,
}) {
  return (
    <div onClick={() => handleClickProject(project)}>
      <p>{project.proj_name}</p>
      {/* if project id matches the id of the selected project, then say it's selected */}
      {(selectedProject && selectedProject.id === project.id) && (<p>has been selected</p>)}
    </div>
  );
}
