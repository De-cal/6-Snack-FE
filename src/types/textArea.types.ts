export type TTextAreaProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
};

export type TTextAreaVariant = "cart" | "modal";

/**
 * @JJOBO
 * 1. Props는 해당 컴포넌트에서 사용하도록 변경
 */
