import { Button } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router";

type Props = {
  link: string;
};

const EditButton = ({ link }: Props) => {
  return (
    <Button asChild bg="green.500">
      <Link to={link}>
        <MdEdit />
      </Link>
    </Button>
  );
};

export default EditButton;
