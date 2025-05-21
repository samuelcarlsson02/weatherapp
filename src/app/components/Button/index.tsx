import { ButtonProps } from "@/app/interfaces/IButton";

export const Button = ({ label, className, onClick }: ButtonProps) => (
  <>
    <button className={className} onClick={onClick}>
      {label}
    </button>
  </>
);

export default Button;
