import { useState } from "react";
import styles from "./ProjectModal.module.css";
import ModalForm from "../shared/ModalForm";

export default function AddProjectModal({
  toggleShowAddModal,
  showAddModal,
  addNewProject,
}) {
  const btnText='Add'

  //create state variable for each new project key/value pair
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [lead, setLead] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [size, setSize] = useState("");
  const [utility, setUtility] = useState("");

  const handleSubmit = (e) => {
    //prevent page from refreshing
    e.preventDefault();

    const newProject = {
      id: Date.now(),
      location: {
        lat: Number(lat),
        lng: Number(lng),
      },
      proj_lead: lead,
      proj_name: name,
      proj_status: status,
      system_size: Number(size),
      utility: utility,
    };

    console.log("new_project: ", newProject);

    console.log("Form submitted");
    addNewProject(newProject);
    toggleShowAddModal();
  };

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.overlay} onClick={toggleShowAddModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Add a New Project</h2>
            <ModalForm
              onSubmitFunction={handleSubmit}
              className={styles.projForm}
              lat={lat}
              setLat={setLat}
              lng={lng}
              setLng={setLng}
              lead={lead}
              setLead={setLead}
              name={name}
              setName={setName}
              status={status}
              setStatus={setStatus}
              size={size}
              setSize={setSize}
              utility={utility}
              setUtility={setUtility}
              toggleModal={toggleShowAddModal}
              showAddModal={showAddModal}
              btnText={btnText}
            ></ModalForm>
          </div>
        </div>
      </div>
    </>
  );
}
