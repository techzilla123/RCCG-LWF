interface NotificationBadgeProps {
  count: number;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count }) => {
  return (
    <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex items-center justify-center min-w-[16px] h-[16px] leading-none">
      {count}
    </span>
  );
};
