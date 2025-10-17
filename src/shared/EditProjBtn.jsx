import styles from "./EditProjBtn.module.css";

export default function EditProjBtn({ toggleShowUpdateModal }) {
  return (
    <button
      type="button"
      className={styles.editProjBtn}
      onClick={toggleShowUpdateModal}
    >
      Edit
    </button>
  );
}
