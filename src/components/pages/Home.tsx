import useFetchSummary from "@/hooks/UseFetchSummary";
import { supabase } from "@/supabase/supabaseClient";
import { Button, Flex, Stack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router";
import { toaster } from "../ui/toaster";
import SummaryDetail from "../molecules/SummaryDetail";

const Home = () => {
  const summary = useFetchSummary();
  const navigate = useNavigate();
  const onSignOut = async () => {
    await supabase.auth.signOut();
    toaster.create({ title: "サインアウト", type: "info" });
    navigate("/login");
  };
  return (
    <Stack m={4}>
      <SummaryDetail summary={summary} />
      <Flex>
        <Button m={4} asChild>
          <Link to="/battle_log">新規登録</Link>
        </Button>
        <Button m={4} onClick={onSignOut}>
          サインアウト
        </Button>
      </Flex>
    </Stack>
  );
};

export default Home;
