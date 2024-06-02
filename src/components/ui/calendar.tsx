import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar as ModernCalendar } from "@hassanmojab/react-modern-calendar-datepicker";
import { useState } from "react";
function Calendar(props) {
  console.log("this is the range value");
  const [dummyDate, setDummyDate] = useState(null);
  return (
    <ModernCalendar
      colorPrimary="#037c76"
      colorPrimaryLight="#04b0a83f"
      value={props.value}
      onChange={props.onChange}
    />
  );
}

export { Calendar };
