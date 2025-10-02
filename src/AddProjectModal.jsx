import styles from "./AddProjectModal.module.css";

export default function AddProjectModal({ toggleModal }) {
  return (
    <>
      <div className={styles.modal}>
        <div className={styles.overlay}>
          <div className={styles.modalContent}>
            <h1>This is the modal.</h1>
            <button onClick={toggleModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
