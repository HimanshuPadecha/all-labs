"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { seedRouter } from "@/trpc-procedures-types/types";

interface pageProps {
  labId: string;
  setLabId: (labId: string) => void;
  isLoading: boolean;
  labs: seedRouter["getValidLabIds"];
}

const SelectLabs = ({ isLoading, labId, labs, setLabId }: pageProps) => {
  return (
    <Select value={labId} onValueChange={setLabId} disabled={isLoading}>
      <SelectTrigger className="w-[180px] ">
        <SelectValue placeholder={"🧫 Select Lab : "} />
        <SelectContent>
          <SelectGroup>
            <SelectLabel>🔬 Select a Lab :</SelectLabel>
            {labs &&
              labs.map(({ id, no, name, questionsCount }) => (
                <SelectItem value={id} key={id}>
                  {no}. {name} - {questionsCount}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </SelectTrigger>
    </Select>
  );
};

export default SelectLabs;
