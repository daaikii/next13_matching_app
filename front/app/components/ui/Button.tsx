import styles from "@/app/components/ui/Button.module.scss"

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

const Button = ({ children, onClick, type, disabled }: ButtonProps) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      type={type}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
