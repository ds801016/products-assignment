import { useToast } from "@/components/ui/use-toast";

const useToaster = () => {
  const { toast } = useToast();

  const showToast = (
    type: "error" | "success",
    title: string,
    description: string
  ) => {
    toast({
      variant: type === "error" ? "destructive" : "default",
      title,
      description,
    });
  };
  return showToast;
};

export default useToaster;
