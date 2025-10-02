import styles from "./AddProjectModal.module.css";

export default function AddProjectModal({ projectModal, setProjectModal }) {
  //function that changes projectModal state to false if true, or true if false
  const toggleModal = () => {
    setProjectModal(!projectModal);
  };

  return (
    <>
      <button onClick={toggleModal}>Add New Project</button>

      <div className={styles.modal}>
        <div className={styles.overlay} onClick={toggleModal}>
          <div className={styles.modalContent}>
            <h1>This is the modal.</h1>
            <button onClick={toggleModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
