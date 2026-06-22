import { toaster } from "@/components/ui/toaster";
import useFetchSummary from "@/features/battleLog/hooks/UseFetchSummary";
import { supabase } from "@/lib/supabaseClient";
import { Button, Flex } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router";
import SummaryDetail from "../components/SummaryDetail";

const Home = () => {
  const summary = useFetchSummary();
  const navigate = useNavigate();
  const onSignOut = async () => {
    await supabase.auth.signOut();
    toaster.create({ title: "サインアウト", type: "info" });
    navigate("/login");
  };
  return (
    <Flex direction="column" p={4} h="full">
      <SummaryDetail summary={summary} flex="1" />
      <Flex justifyContent="stretch" p={4} gap={4}>
        <Button asChild>
          <Link to="/battle_log">新規登録</Link>
        </Button>
        <Button onClick={onSignOut}>サインアウト</Button>
      </Flex>
    </Flex>
  );
};

export default Home;
