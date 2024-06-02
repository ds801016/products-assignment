import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { forwardRef } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface PropTypes {
  onChange: (value: Date) => void;
  value: string;
  placeholder: string;
}
const MyDatePicker = (props: PropTypes) => {
  return (
    <div>
      <DatePicker
        className="bg-red-200"
        selected={props.value}
        onChange={(date) => props.onChange(date)}
        timeInputLabel="Time:"
        dateFormat="MM/dd/yyyy h:mm aa"
        showTimeInput
        customInput={<ExampleCustomInput placeholder={"Hello"} />}
        renderDayContents={renderDayContents}
        calendarContainer={MyContainer}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
        }) => {
          return (
            <div className="bg-transparent py-2 ">
              <div className="flex justify-between items-center px-4 text-muted-foreground">
                <div>
                  <Button
                    aria-label="Previous Month"
                    size={"sm"}
                    className="rounded-full p-2]"
                    variant="outline"
                    onClick={decreaseMonth}
                  >
                    <ChevronLeft size={18} />
                  </Button>
                </div>
                <div className="text-[15px]">
                  {dayjs(date).format("MMM - YYYY") ??
                    props.placeholder ??
                    "Select Date"}
                </div>
                <div>
                  <Button
                    aria-label="Next Month"
                    size={"sm"}
                    className="rounded-full p-2"
                    variant="outline"
                    onClick={increaseMonth}
                  >
                    <ChevronRight size={18} />
                  </Button>
                </div>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default MyDatePicker;

const MyContainer = ({ className, children }) => {
  return (
    <div className="border rounded-lg p-2">
      <CalendarContainer className={cn(className)}>
        <div style={{ position: "relative" }}>{children}</div>
      </CalendarContainer>
    </div>
  );
};

const ExampleCustomInput = forwardRef(
  ({ value, onClick, placeholder }, ref) => {
    console.log("this is the placholder", placeholder);
    return (
      <Button
        variant="outline"
        onClick={onClick}
        ref={ref}
        className="flex flex-row justify-start w-full hover:bg-white  min-w-[200px]"
      >
        <div className=" w-full h-full  flex justify-between items-center">
          {/* f */}
          <div
            className={cn(
              "flex  flex-1 w-full",
              !value?.text && "text-muted-foreground font-normal"
            )}
          >
            {value === "" ? placeholder : value}
          </div>
          <div>
            <CalendarDays className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </div>
      </Button>
    );
  }
);

const renderDayContents = (day, date) => {
  return <div className="rounded-full">{dayjs(date).format("DD")}</div>;
};
