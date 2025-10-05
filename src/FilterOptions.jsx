import { useState, useEffect } from "react";

export default function FilterOptions({
  projects,
  setFilterField,
  setFilterValue,
  filterField,
  filterValue,
}) {

const statuses = ['Planning', 'Development', 'Construction', 'Operational', 'Decommissioning'];

  //declare local state variables for setting the filter fields and values based on user input
  const [selectedField, setSelectedField] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  // define functions for handling change events in form
  // prevent the page from refreshing when a change event occurs
  function preventRefresh(event) {
    event.preventDefault();
  }
  //set filter field
  function handleFilterField(event) {
    setFilterField(event.target.value);
  }
  //set filter value
  function handleFilterValue(event) {
    setFilterValue(event.target.value);
  }
  function clearFilters() {
    preventRefresh;
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
            value={selectedField}
            onChange={(event) => {
              preventRefresh;
              console.log("status of selectedField changed");
              setFilterField(event.target.value);
              console.log("event.target.value: ", event.target.value);
            }}
          >
            <option defaultValue="">Select option</option>
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
            value={selectedValue}
            onChange={(event) => {
              preventRefresh;
              console.log("status of selectedValue changed");
              setFilterValue(event.target.value);
              console.log("event.target.value: ", event.target.value);
            }}
          >
            <option defaultValue="">Select value</option>
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </form>
      {/* clear filters button to reset filteredProjects to empty */}
      <button onClick={clearFilters}>Clear Filters</button>
    </div>
  );
}
