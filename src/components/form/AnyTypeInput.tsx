import { HTMLInputTypeAttribute } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { CommonInputProps } from "./MultiSelectorInput";

interface TextInputProps extends CommonInputProps {
  type: HTMLInputTypeAttribute;
}

const AnyTypeInput = ({control, name, label, placeholder, type}:TextInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AnyTypeInput;
