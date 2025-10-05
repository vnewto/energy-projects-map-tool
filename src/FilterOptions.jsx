export default function FilterOptions({
  setFilterField,
  setFilterValue,
  filterField,
  filterValue,
}) {
  const statuses = [
    "Planning",
    "Development",
    "Construction",
    "Operational",
    "Decommissioning",
  ];

  const utilities = [
    "Apex Energy",
    "Clearwater Electric",
    "Northpoint Energy",
    "Meridian Power",
    "Summit Valley",
  ];

  function clearFilters() {
    setFilterField("");
    setFilterValue("");
  }

  console.log("filterField: ", filterField);
  console.log("filterValue: ", filterValue);

  return (
    <div>
      {/* form with two select inputs, one for field and one for value */}
      <form>
        {/* Select Field Input */}
        <div>
          <label>Filter by: </label>
          <select
            name="field"
            id="field"
            value={filterField}
            onChange={(event) => {
              console.log("status of selectedField changed");
              setFilterField(event.target.value);
              console.log("event.target.value: ", event.target.value);
            }}
          >
            <option defaultValue="" value="">
              Select option
            </option>
            <option key="status" value="status">
              Project Status
            </option>
            <option key="utility" value="utility">
              Utility
            </option>
          </select>
        </div>

        {/* Select Operation Input */}
        <div>
          <select name="operator">
            <option defaultValue="">Select option</option>
            <option value="is">equals</option>
          </select>
        </div>

        {/* Select Value Input */}
        <div>
          <select
            name="proj_status"
            id="proj_status"
            value={filterValue}
            onChange={(event) => {
              console.log("status of selectedValue changed");
              setFilterValue(event.target.value);
              console.log("event.target.value: ", event.target.value);
            }}
          >
            <option defaultValue="" value="">
              Select value
            </option>
            {/* show status options only if filterfield is set to status */}
            {filterField === "status" &&
              statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            {/* show utility options only if filterfield is set to utility */}
            {filterField === "utility" &&
              utilities.map((utility) => (
                <option key={utility} value={utility}>
                  {utility}
                </option>
              ))}
          </select>
        </div>
      </form>
      {/* clear filters button to reset filteredProjects to empty */}
      <button type="button" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
}
