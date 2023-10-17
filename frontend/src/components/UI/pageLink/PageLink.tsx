import { HTMLProps } from 'react';
import './PageLink.css';

export type Props = HTMLProps<HTMLAnchorElement> & { active?: boolean };

export default function PageLink({
  className,
  active,
  disabled,
  children,
  ...otherProps
}: Props) {
  const combinedClassName = [
    'page-link',
    className,
    active ? 'active' : '',
    disabled ? 'disabled' : '',
  ].join(' ');

  if (disabled) {
    return <span className={combinedClassName}>{children}</span>;
  }

  return (
    <a
      className={combinedClassName}
      aria-current={active ? 'page' : undefined}
      {...otherProps}
    >
      {children}
    </a>
  );
}
