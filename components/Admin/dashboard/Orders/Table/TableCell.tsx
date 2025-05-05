import { TableCellProps } from './types';

export const TableCell: React.FC<TableCellProps> = ({ children, className = '', align = 'left' }) => {
  const alignmentClasses = {
    left: '',
    right: 'text-right',
    center: 'text-center'
  };

  return (
    <div
      className={`flex overflow-hidden gap-4 py-2 px-4 w-full h-14 text-base tracking-normal text-black border-b border-solid border-b-[color:var(--colour-stroke-disabled,#EAEAEA)] min-h-14 ${alignmentClasses[align]} ${className}`}
    >
      {children}
    </div>
  );
};