import React from "react";
import { Form } from "@/components/ui/form";

interface propTypes {
  children: React.ReactNode;
  form: any;
}

const MyForm = (props: propTypes) => {
  return <Form {...props.form}>{props.children}</Form>;
};

export default MyForm;
