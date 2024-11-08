import { Label } from "../ui/label";
import MultipleSelector, { Option } from "../ui/multi-select";

type MultiFilterProps = {
  option: Option[];
  param: string | null;
  handlefunc: (option: Option[]) => void;
  label: string;
  placeholder: string;
};
const MultiFilter = ({
  handlefunc,
  param,
  option,
  placeholder,
  label,
}: MultiFilterProps) => {
  return (
    <div>
      <Label className="">{label}</Label>

      <MultipleSelector
        options={option}
        placeholder={placeholder}
        defaultOptions={option}
        value={
          param
            ? param
                .split(",")
                .map((value: string) =>
                  option.find((opt: Option) => opt.value === value)
                )
                .filter((opt): opt is Option => opt !== undefined)
            : []
        }
        className="bg-white focus-visible:ring-0"
        onChange={handlefunc}
      />
    </div>
  );
};

export default MultiFilter;
