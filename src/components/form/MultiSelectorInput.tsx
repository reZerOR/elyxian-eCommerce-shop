import { Control, InternalFieldName } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import MultipleSelector, { Option } from "../ui/multi-select";

export interface CommonInputProps {
  control: Control<any>;
  placeholder: string;
  label: string;
  name: InternalFieldName;
}

interface MultiSelectorInputProps extends CommonInputProps {
    options: Option[];

  }
  
  const MultiSelectorInput: React.FC<MultiSelectorInputProps> = ({
    control,
    options,
    placeholder,
    label,
    name,
  }) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <MultipleSelector
                options={options}
                placeholder={placeholder}
                defaultOptions={options}
                value={field.value?.map(
                  (value: string) =>
                    options.find((opt: Option) => opt.value === value) || {
                      value,
                      label: value,
                    }
                )}
                onChange={(options: Option[]) =>
                  field.onChange(options.map((option: Option) => option.value))
                }
              />
            </FormControl>
  
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

export default MultiSelectorInput