import { useState } from "react";
import styles from "./ProjectModal.module.css";
import ModalForm from "../shared/ModalForm";

export default function UpdateProjectModal({
  toggleShowUpdateModal,
  showUpdateModal,
  updateProject,
  selectedProject,
}) {
  //fill in fields of modal with the preexisting project information
  //create state variable for each new project key/value pair
  const [lat, setLat] = useState(selectedProject.location.lat);
  const [lng, setLng] = useState(selectedProject.location.lng);
  const [lead, setLead] = useState(selectedProject.proj_lead);
  const [name, setName] = useState(selectedProject.proj_name);
  const [status, setStatus] = useState(selectedProject.proj_status);
  const [size, setSize] = useState(selectedProject.system_size);
  const [utility, setUtility] = useState(selectedProject.utility);

  const handleSubmit = (e) => {
    //prevent page from refreshing
    e.preventDefault();

    const updatedProject = {
      id: selectedProject.id,
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

    updateProject(updatedProject);
    console.log("updatedProject: ", updatedProject);
    toggleShowUpdateModal();
  };


  return (
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={toggleShowUpdateModal}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Edit Project</h2>
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
            toggleModal={toggleShowUpdateModal}
            showUpdateModal={showUpdateModal}
          ></ModalForm>
          <br />
        </div>
      </div>
    </div>
  );
}
