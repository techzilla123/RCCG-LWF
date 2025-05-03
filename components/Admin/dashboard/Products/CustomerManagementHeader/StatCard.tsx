interface StatCardProps {
    icon: React.ReactNode;
    value: string;
    label: string;
  }
  
  export const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => {
    return (
      <article className="flex flex-1 items-center p-6 rounded-lg border border-solid bg-stone-50 border-neutral-300">
        <div className="flex justify-center items-center mr-4 w-14 h-14 bg-white rounded-[100px]">
          {icon}
        </div>
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold text-black">{value}</h3>
          <p className="text-base text-neutral-500">{label}</p>
        </div>
      </article>
    );
  };
  