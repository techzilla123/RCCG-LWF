export interface TableHeaderProps {
    title: string;
    sortIcon?: string;
    className?: string;
  }
  
  export interface TableCellProps {
    children: React.ReactNode;
    className?: string;
    align?: 'left' | 'right' | 'center';
  }
  
  export interface StatusTagProps {
    status: 'Active' | 'Disabled' | 'Out of stock';
  }
  
  export interface BorderElementProps {
    className?: string;
  }