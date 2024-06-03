import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface props {
  content: string;
  children: React.ReactNode;
}
export function MyTooltip(props: props) {
  return (
    <HoverCard>
      <HoverCardTrigger className="bg-blue-200">
        {props.children}
      </HoverCardTrigger>
      <HoverCardContent>Hello wo rld</HoverCardContent>
    </HoverCard>
  );
}
