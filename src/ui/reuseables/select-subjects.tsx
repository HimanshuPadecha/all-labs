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
  subjectId: string;
  setSubjectId: (subjectId: string) => void;
  setLabId: (labId: string) => void;
  subjects: seedRouter["subjects"];
}

const SelectSubjects = ({
  subjectId,
  setSubjectId,
  setLabId,
  subjects,
}: pageProps) => {
  return (
    <Select
      value={subjectId}
      onValueChange={(newSubjectId) => {
        setSubjectId(newSubjectId);
        setLabId("");
      }}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={"📘 Select Subject :"} />
        <SelectContent>
          <SelectGroup>
            <SelectLabel>📚 Select a Subject :</SelectLabel>
            {subjects.map(({ name, id }) => (
              <SelectItem value={id} key={id}>
                {name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectTrigger>
    </Select>
  );
};

export default SelectSubjects;
