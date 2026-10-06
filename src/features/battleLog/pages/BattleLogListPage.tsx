import { toaster } from "@/components/ui/toaster";
import useFetchSummary from "@/features/battleLog/hooks/UseFetchSummary";
import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router";
import SummaryDetail from "../components/SummaryDetail";
import useAuth from "@/features/auth/hooks/UseAuth";
import deleteBattleLog from "../api/deleteBattleLog";
import PrimaryDialog from "@/components/atoms/PrimaryDialog";
import { useState } from "react";

const BattleLogListPage = () => {
  const { summary, error, isLoading, mutate } = useFetchSummary();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  const onSignOut = async () => {
    await signOut();
    toaster.create({ title: "サインアウト", type: "info" });
    navigate("/login");
  };

  const onDelete = async (logNo: number) => {
    const { error } = await deleteBattleLog(logNo);
    if (error) {
      toaster.create({ title: "削除失敗", type: "error" });
      return;
    }
    mutate();
    toaster.create({ title: "削除しました。", type: "success" });
  };

  if (isLoading) return <Spinner m="auto" position="absolute" top="50%" left="50%" />;
  if (error) return <div>データが取得できませんでした。</div>;

  return (
    <Flex direction="column" p={2} h="full" justifyContent="center">
      {summary.length ? (
        <SummaryDetail summary={summary} onDelete={(logNo) => setDeleteTarget(logNo)} flex="1" />
      ) : (
        <Text m="auto">対戦記録を登録！</Text>
      )}

      <Flex justifyContent="center" p={4} gap={4}>
        <Button asChild {...(summary.length ? {} : { bg: "yellow.300", animation: "pulse" })}>
          <Link to="/battle_logs/new">新規登録</Link>
        </Button>
        <Button onClick={onSignOut}>サインアウト</Button>
        <Button asChild>
          <Link to="/contact">問い合わせ</Link>
        </Button>
      </Flex>

      <PrimaryDialog
        open={deleteTarget != null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        message="削除しますか？"
        onConfirm={() => {
          if (deleteTarget != null) {
            onDelete(deleteTarget);
            setDeleteTarget(null);
          }
        }}
      />
    </Flex>
  );
};

export default BattleLogListPage;
