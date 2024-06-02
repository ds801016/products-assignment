import { Loader } from "lucide-react";

interface PropTypes {
  size?: "lg" | "md";
}

const Loading = ({ size = "md" }: PropTypes) => {
  return (
    <div className="h-full w-full flex justify-center items-center absolute z-[99] bg-white bg-opacity-65 ">
      <Loader
        size={size === "md" ? 5 : 35}
        className={`animate-spin-slow text-muted-foreground`}
      />
    </div>
  );
};

export default Loading;
