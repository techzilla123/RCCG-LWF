import { StatCard } from "./StatCard";
import { UsersIcon, VerifiedIcon, ActiveIcon, VisitorsIcon } from "./Icons";

export const StatisticsGrid = () => {
  return (
    <section className="flex gap-6 mt-6 max-md:flex-col max-sm:flex-col">
      <StatCard icon={<UsersIcon />} value="350,000" label="Total Users" />
      <StatCard icon={<VerifiedIcon />} value="104,930" label="Verified" />
      <StatCard icon={<ActiveIcon />} value="290,064" label="Active" />
      <StatCard icon={<VisitorsIcon />} value="50,000" label="Visitors" />
    </section>
  );
};
