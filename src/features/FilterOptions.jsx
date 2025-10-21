import styles from "./FilterOptions.module.css";

export default function FilterOptions({
  setFilterField,
  setFilterValue,
  filterOperator,
  setFilterOperator,
  filterField,
  filterValue,
  setSelectedProject,
}) {
  const operators = [
    { opKey: "greater than", opValue: ">" },
    { opKey: "greater than or equal to", opValue: ">=" },
    { opKey: "less than", opValue: "<" },
    { opKey: "less than or equal to", opValue: "<=" },
    { opKey: "equals", opValue: "=" },
  ];

  const mWs = [50, 100, 150];

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
    setFilterOperator("");
    setSelectedProject("");
  }

  console.log("filterField: ", filterField);
  console.log("filterOperator: ", filterOperator);
  console.log("filterValue: ", filterValue);

  return (
    <div className={styles.formContainer}>
      {/* form with three select inputs, one for field, one for operator, and one for value */}
      <form>
        {/* Select Field Input */}
        <label className={styles.formLabel}>Filter by: </label>
        <div className={styles.selectOptionsContainer}>
          <select
            name="field"
            id="field"
            value={filterField}
            onChange={(event) => {
              console.log("status of selectedField changed");
              setFilterField(event.target.value);
              setFilterOperator("");
              setFilterValue("");
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
            <option key="system_size_mw" value="system_size_mw">
              System Size (MW)
            </option>
          </select>

          {/* Select Operation Input */}
          <div>
            <select
              name="operator"
              id="operator"
              value={filterOperator}
              onChange={(event) => {
                console.log("status of filterOperator changed");
                setFilterOperator(event.target.value);
                console.log("event.target.value: ", event.target.value);
              }}
            >
              <option defaultValue="">Select option</option>
              {(filterField === "status" || filterField === "utility") && (
                <option value="=">equals</option>
              )}
              {filterField === "system_size_mw" &&
                operators.map((operator) => (
                  <option key={operator.opKey} value={operator.opValue}>
                    {operator.opKey}
                  </option>
                ))}
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
              {filterField === "system_size_mw" &&
                mWs.map((mW) => (
                  <option key={mW} value={mW}>
                    {mW}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </form>
      {/* clear filters button to reset filteredProjects to empty */}
      <button
        className={styles.clearFiltersBtn}
        type="button"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
}
