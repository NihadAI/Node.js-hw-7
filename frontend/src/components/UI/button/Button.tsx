import './button.css'

const Button: React.FC<Props> = ({
  children,
  onClick,
  variant = 'default',
  size = 'md',
  disabled,
  type,
  ...rest
}) => {
  return (
    <button
      className={`btn ${variant} ${size}` + (disabled ? ' disabled' : '')}
      onClick={onClick}
      disabled={disabled}
      {...rest}
      type={type}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;