import { IconButton } from "@chakra-ui/react";
import { GrView } from "react-icons/gr";
import { Link } from "react-router";

type Props = {
  link: string;
};

const ViewButton = ({ link }: Props) => {
  return (
    <IconButton asChild bg="green.500" size="xs">
      <Link to={link}>
        <GrView />
      </Link>
    </IconButton>
  );
};

export default ViewButton;
