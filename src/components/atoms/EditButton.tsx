import { IconButton } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router";

type Props = {
  link: string;
};

const EditButton = ({ link }: Props) => {
  return (
    <IconButton asChild bg="green.500" size="xs">
      <Link to={link}>
        <MdEdit />
      </Link>
    </IconButton>
  );
};

export default EditButton;
