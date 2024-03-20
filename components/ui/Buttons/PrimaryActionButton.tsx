import { Spinner } from '@/components/ui/Spinner';
import { ActionButtonProps } from './types';

const PrimaryActionButton = ({
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
      className='primary'
    >
      {loading ? <Spinner /> : <span>{text}</span>}
    </button>
  );
};

export { PrimaryActionButton };