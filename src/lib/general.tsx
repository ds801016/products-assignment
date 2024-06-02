import { Building2, Factory, LocateFixed, User } from "lucide-react";
import { InternalRouteType } from "@/types/general";
import { adminInternalRoutes } from "./route";
import dayjs from "dayjs";

export interface SelectOptionType {
  text: string;
  value: string;
  disabled?: boolean;
}

export const formatDate = (value: Date): string => {
  return dayjs(value).format("DD-MMM-YY HH:mm");
};
