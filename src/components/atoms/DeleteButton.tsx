import { Button } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

type Props = {
  onClick: () => void;
};

const DeleteButton = ({ onClick }: Props) => {
  return (
    <Button bg="red.500" onClick={onClick}>
      <MdDelete />
    </Button>
  );
};

export default DeleteButton;
