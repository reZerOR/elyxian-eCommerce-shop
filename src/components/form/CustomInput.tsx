import { HTMLInputTypeAttribute, LabelHTMLAttributes } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { CommonInputProps } from "./MultiSelectorInput";

interface InputProps extends CommonInputProps {
  type?: HTMLInputTypeAttribute;
  htmlFor?: string
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  type,
  htmlFor,
}: InputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange, ...field } }) => (
        <FormItem>
          <FormLabel htmlFor={htmlFor}>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              id={htmlFor}
              value={type === "number" ? value || "" : value}
              onChange={(event) =>
                onChange(
                  type === "number" ? event.target.valueAsNumber || 0 : event.target.value
                )
              }
              min={type === "number" ? 0 : undefined}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
