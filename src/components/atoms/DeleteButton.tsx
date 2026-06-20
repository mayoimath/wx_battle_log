import { IconButton } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

type Props = {
  onClick: () => void;
};

const DeleteButton = ({ onClick }: Props) => {
  return (
    <IconButton bg="red.500" onClick={onClick} size="xs">
      <MdDelete />
    </IconButton>
  );
};

export default DeleteButton;
