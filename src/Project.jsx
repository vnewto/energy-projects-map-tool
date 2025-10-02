export default function Project({project, handleClickProject}) {
  return (
    <div onClick={() => handleClickProject(project)}>
      <p>{project.proj_name}</p>
    </div>
  );
}
