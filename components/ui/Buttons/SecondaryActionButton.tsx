import { ActionButtonProps } from './types';

const SecondaryActionButton = ({
  loading,
  onClick,
  text,
  type = 'button',
}: ActionButtonProps) => {
  return (
    <button
      disabled={loading}
      type={type}
      onClick={onClick}
      className='secondary'
    >
      {text}
    </button>
  );
};

export { SecondaryActionButton };
