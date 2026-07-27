import { screen } from "@testing-library/react";
import BattleLogListPage from "./BattleLogListPage";
import renderWithProviders from "@/test/render";
import { supabase } from "@/lib/supabaseClient";

// 対戦サマリ一覧画面(初期画面)
const { supabaseMock } = vi.hoisted(() => {
  const select = vi.fn().mockResolvedValue({
    data: [
      { log_no: 1, title: "test1", lrig_name: "タマ", won_count: 3, lose_count: 2 },
      { log_no: 2, title: "test2", lrig_name: "花代", won_count: 1, lose_count: 0 },
      { log_no: 3, title: "test3", lrig_name: "ピルルク", won_count: 0, lose_count: 5 },
    ],
    error: null,
  });
  return { supabaseMock: { from: vi.fn(() => ({ select })) } };
});
vi.mock(import("@/lib/supabaseClient.ts"), () => ({ supabase: supabaseMock as unknown as typeof supabase }));

beforeEach(() => {
  renderWithProviders(<BattleLogListPage />);
});

describe("初期表示", () => {
  test("対戦ログが表示される", async () => {
    expect(await screen.findAllByRole("listitem")).toHaveLength(3);
  });
  // TODO:0件時の仕様
  // test("対戦ログが0件の場合＊＊",()=>{})
  test("新規登録ボタン(リンク)が表示される", () => {
    const registerButton = screen.getByRole("link", { name: "新規登録" });
    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toHaveAttribute("href", "/battle_log");
  });
  test("サインアウトボタンが表示される", () => {
    expect(screen.getByRole("button", { name: "サインアウト" })).toBeInTheDocument();
  });
});

// describe("イベント", () => {
// test("削除ボタン押下時、該当ログが削除される。", () => {});
// test("サインアウトボタン押下時、サインアウトしログイン画面に遷移する。", () => {});
// });
