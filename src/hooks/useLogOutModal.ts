import { logoutModalState } from "@/recoil/logoutModalAtom";

import { useRecoilState } from "recoil";

const useLogOutModal = () => {
  const [showModal, setShowModal] = useRecoilState(logoutModalState);
  const handleShow = () => {
    setShowModal(true);
  };

  const handleHide = () => {
    setShowModal(false);
  };

  return { showModal, handleShow, handleHide };
};

export default useLogOutModal;
