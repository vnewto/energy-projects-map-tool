export default function ModalForm({
  onSubmitFunction,
  className,
  lat,
  setLat,
  lng,
  setLng,
  lead,
  setLead,
  name,
  setName,
  status,
  setStatus,
  size,
  setSize,
  utility,
  setUtility,
  toggleModal,
  showAddModal,
  showUpdateModal
}) {
  return (
    <>
      <form onSubmit={onSubmitFunction} className={className}>
        <br />
        <label htmlFor="proj_name">Project Name</label>
        <input
          type="text"
          name="proj_name"
          id="proj_name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <br />
        <label htmlFor="lat">Latitude</label>
        <input
          type="number"
          name="lat"
          id="lat"
          required
          inputMode="decimal"
          pattern="[0-9]*[.,]?[0-9]*"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        ></input>
        <br />
        <label htmlFor="lng">Longitude</label>
        <input
          type="number"
          name="lng"
          id="lng"
          required
          inputMode="decimal"
          pattern="[0-9]*[.,]?[0-9]*"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        ></input>
        <br />
        <label htmlFor="system_size">System Size (MW)</label>
        <input
          type="number"
          name="system_size"
          id="system_size"
          inputMode="decimal"
          pattern="[0-9]*[.,]?[0-9]*"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        ></input>
        <br />
        <label htmlFor="utility">Utility</label>
        <input
          type="text"
          name="utility"
          id="utility"
          value={utility}
          onChange={(e) => setUtility(e.target.value)}
        ></input>
        <br />
        <label htmlFor="proj_status">Status</label>
        {showUpdateModal && (
          <select
            name="proj_status"
            id="proj_status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value="Planning">Planning</option>
            <option value="Development">Development</option>
            <option value="Construction">Construction</option>
            <option value="Operational">Operational</option>
            <option value="Decommissioning">Decommissioning</option>
          </select>
        )}
        {showAddModal && (
          <select
            name="proj_status"
            id="proj_status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value="" selected disabled hidden>
              Choose here
            </option>
            <option value="Planning">Planning</option>
            <option value="Development">Development</option>
            <option value="Construction">Construction</option>
            <option value="Operational">Operational</option>
            <option value="Decommissioning">Decommissioning</option>
          </select>
        )}
        <br />
        <label htmlFor="proj_lead">Project Lead</label>
        <input
          type="text"
          name="proj_lead"
          id="proj_lead"
          value={lead}
          onChange={(e) => setLead(e.target.value)}
        ></input>
        <br />

        <button onClick={toggleModal}>Cancel</button>
        <button type="submit">Update</button>
      </form>
    </>
  );
}
