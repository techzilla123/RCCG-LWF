import { StatusTagProps } from './types';

export const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  const statusStyles = {
    'Active': 'text-emerald-600',
    'Disabled': 'text-neutral-500',
    'Out of stock': 'text-rose-600'
  };

  return (
    <div className="flex flex-wrap gap-2 items-start self-stretch my-auto">
      <div className={`text-sm leading-[24px)] ${statusStyles[status]}`}>
        {status}
      </div>
    </div>
  );
};