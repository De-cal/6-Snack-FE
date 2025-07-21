export type TTextAreaProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
};

export type TTextAreaVariant = "cart" | "modal";
