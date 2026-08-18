import renderWithProviders from "@/test/render";
import { screen } from "@testing-library/react";
import Login from "./Login";
import type { AuthError } from "@supabase/supabase-js";
import userEvent from "@testing-library/user-event";

const authMock = vi.hoisted(() => ({
  signIn: vi.fn(),
  signUp: vi.fn(),
}));

vi.mock("@/features/auth/hooks/UseAuth", () => ({
  default: () => ({
    user: null,
    loading: false,
    signOut: vi.fn(),
    ...authMock,
  }),
}));

beforeEach(() => {
  vi.resetAllMocks();
  renderWithProviders(<Login />);
});

describe("初期表示", () => {
  test("ログインボタン", () => {
    expect(screen.getByRole("button", { name: "ログイン" })).toBeInTheDocument();
  });
  test("新規登録ボタン", () => {
    expect(screen.getByRole("button", { name: "新規登録" })).toBeInTheDocument();
  });
  test("メールアドレス", () => {
    expect(screen.getByRole("textbox", { name: "メールアドレス" })).toBeInTheDocument();
  });
  test("パスワード", () => {
    const password = screen.getByLabelText("パスワード");
    expect(password).toBeInTheDocument();
    expect(password).toHaveAttribute("type", "password");
  });
  test("初めての方(注意書き)", () => {
    expect(screen.getByText("初めての方", { exact: false })).toBeInTheDocument();
  });
});

describe("ログイン", () => {
  test("メールアドレスの形式が不正の場合、エラーメッセージが表示される。", async () => {
    const user = userEvent.setup();
    await user.type(screen.getByRole("textbox", { name: "メールアドレス" }), "abcdef");
    await user.type(screen.getByLabelText("パスワード"), "abcdef");
    await user.click(screen.getByRole("button", { name: "ログイン" }));
    expect(await screen.findByText("メールアドレスの形式が正しくありません。")).toBeInTheDocument();
    expect(authMock.signIn).not.toHaveBeenCalled();
  });

  test("パスワードが6文字未満、エラーメッセージが表示される。", async () => {
    const user = userEvent.setup();
    await user.type(screen.getByRole("textbox", { name: "メールアドレス" }), "abc@def.co.jp");
    await user.type(screen.getByLabelText("パスワード"), "abcde");
    await user.click(screen.getByRole("button", { name: "ログイン" }));
    expect(await screen.findByText("パスワードは6文字以上にしてください。")).toBeInTheDocument();
    expect(authMock.signIn).not.toHaveBeenCalled();
  });

  test("未登録のメールアドレス/パスワードの場合、エラーメッセージが表示される。", async () => {
    const user = userEvent.setup();
    authMock.signIn.mockResolvedValue({ code: "invalid_credentials", message: "" } as AuthError);
    await user.type(screen.getByRole("textbox", { name: "メールアドレス" }), "abc@def.co.jp");
    await user.type(screen.getByLabelText("パスワード"), "abcdef");
    await user.click(screen.getByRole("button", { name: "ログイン" }));
    expect(authMock.signIn).toHaveBeenCalledWith("abc@def.co.jp", "abcdef");
    expect(await screen.findByText("ユーザ情報が登録されていません。")).toBeInTheDocument();
  });

  test("登録済みのメールアドレス/パスワードの場合、ログイン成功のトースト通知が表示される。", async () => {
    const user = userEvent.setup();
    authMock.signIn.mockResolvedValue(null);
    await user.type(screen.getByRole("textbox", { name: "メールアドレス" }), "abc@def.co.jp");
    await user.type(screen.getByLabelText("パスワード"), "abcdef");
    await user.click(screen.getByRole("button", { name: "ログイン" }));
    expect(authMock.signIn).toHaveBeenCalledWith("abc@def.co.jp", "abcdef");
    expect(await screen.findByRole("status")).toHaveTextContent("ログイン");
  });
});

describe("新規登録", () => {
  test("メールアドレスの形式が不正の場合、エラーメッセージが表示される。", async () => {
    const user = userEvent.setup();
    await user.type(screen.getByRole("textbox", { name: "メールアドレス" }), "abcdef");
    await user.type(screen.getByLabelText("パスワード"), "abcdef");
    await user.click(screen.getByRole("button", { name: "新規登録" }));
    expect(await screen.findByText("メールアドレスの形式が正しくありません。")).toBeInTheDocument();
    expect(authMock.signUp).not.toHaveBeenCalled();
  });

  test("登録済みのメールアドレス/パスワードの場合、エラーメッセージが表示される。", async () => {
    const user = userEvent.setup();
    authMock.signUp.mockResolvedValue({ code: "user_already_exists", message: "" } as AuthError);
    await user.type(screen.getByRole("textbox", { name: "メールアドレス" }), "abc@def.co.jp");
    await user.type(screen.getByLabelText("パスワード"), "abcdef");
    await user.click(screen.getByRole("button", { name: "新規登録" }));
    expect(authMock.signUp).toHaveBeenCalledWith("abc@def.co.jp", "abcdef");
    expect(await screen.findByText("そのユーザはすでに登録されています。")).toBeInTheDocument();
  });

  test("未登録のメールアドレス/パスワードの場合、新規登録成功のトースト通知が表示される。", async () => {
    const user = userEvent.setup();
    authMock.signIn.mockResolvedValue(null);
    await user.type(screen.getByRole("textbox", { name: "メールアドレス" }), "abc@def.co.jp");
    await user.type(screen.getByLabelText("パスワード"), "abcdef");
    await user.click(screen.getByRole("button", { name: "新規登録" }));
    expect(authMock.signUp).toHaveBeenCalledWith("abc@def.co.jp", "abcdef");
    expect(await screen.findByRole("status")).toHaveTextContent("ユーザー登録成功");
  });
});
