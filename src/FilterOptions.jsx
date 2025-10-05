import { useState, useEffect } from "react";

export default function FilterOptions({
  projects,
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
          </select>
        </div>
        <div>
          <select name="operator">
            <option defaultValue="">Select option</option>
            <option value="is">is</option>
          </select>
        </div>
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
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
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
