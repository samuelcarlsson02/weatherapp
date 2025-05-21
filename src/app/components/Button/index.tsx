interface Button {
  label: string;
  className: string;
  onClick: () => void;
}

export const Buttons = ({ label, className, onClick }: Button) => (
  <>
    <button className={className} onClick={onClick}>
      {label}
    </button>
  </>
);

export default Buttons;
