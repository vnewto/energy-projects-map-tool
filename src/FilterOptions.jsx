export default function FilterOptions({ projects }) {
  function defineStatusOptions() {
    //create an empty array
    const array = [];
    //map over projects
    projects.map((project) => {
      //access status property for each project
      const status = project["proj_status"];
      //push for each project into the empty array
      array.push(status);
    });
    //convert the array into a set with unique values
    const set = new Set(array);
    //convert set back to a new statusArray
    const statusArray = [...set];
    //return statusArray
    console.log(statusArray);
    return statusArray;
  }
  const proj_statuses = defineStatusOptions();
  console.log("proj_statuses: ", proj_statuses);

  //map over the array and create an option element for each

  return (
    <div>
      {/* form with two inputs, one for field and one for value */}
      <form>
        <div>
          <label>Filter by: </label>
          <select name="field" id="field">
            <option value="" selected disabled hidden>
              Choose here
            </option>
          </select>
        </div>
        <div>
          <label>is </label>
          <select name="proj_status" id="proj_status">
            <option value="" selected disabled hidden>
              Choose here
            </option>
            {proj_statuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* <label htmlFor="proj_status">Filter by: </label>
              <select
                name="proj_status"
                id="proj_status"
                value={status}
                onChange={(e) => {
                  console.log("status changed");
                  setStatus(e.target.value);
                  console.log("e.target.value: ", e.target.value);
                }}
              >
                <option value="" selected disabled hidden>Choose here</option>
                <option value="Planning">Planning</option>
                <option value="Development">Development</option>
                <option value="Construction">Construction</option>
                <option value="Operational">Operational</option>
                <option value="Decommissioning">Decommissioning</option>
              </select> */}
      </form>
      {/* clear filters button to reset filteredProjects to empty */}
      <button>Clear Filters</button>
    </div>
  );
}
