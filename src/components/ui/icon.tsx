import { icons } from "lucide-react";

const Icon = ({ name, size = 20 }: { name: string; size: number }) => {
  const LucideIcon = icons[name];
  //   const LucideIcon = icons[name];
  return <LucideIcon size={size} className="text-accent" />;
};

export default Icon;
