import ModalDialog from "../common/ModalDialog";

export default function ConfirmStatusModal({
  open,
  onClose,
  onConfirm,
  pendingStatus,
}) {
  return (
    <ModalDialog
      show={open}
      onClose={onClose}
      onConfirm={onConfirm}
      isLoading={false}
      title="Are You Sure?"
      message={`You are about to set this user as ${
        pendingStatus ? "Active" : "Inactive"
      }.`}
      buttonText1="Cancel"
      buttonText2="Yes"
    />
  );
}
