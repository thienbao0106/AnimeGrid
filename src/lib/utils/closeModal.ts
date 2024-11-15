export const closeModalFromOutside = (
  modal: HTMLDialogElement,
  setCloseModal: Function
) => {
  modal.addEventListener("click", (event: MouseEvent) => {
    const dimension = modal.getBoundingClientRect();
    if (
      event.clientX < dimension.left ||
      event.clientX > dimension.right ||
      event.clientY < dimension.top ||
      event.clientY > dimension.bottom
    ) {
      modal.close();
      setCloseModal();
    }
  });
};
