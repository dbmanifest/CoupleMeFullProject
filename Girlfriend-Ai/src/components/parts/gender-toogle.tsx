import { motion } from "framer-motion";
import { Flower, Swords } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

const TOGGLE_CLASSES =
  "text-base font-medium flex items-center gap-2 px-3 md:pl-6 md:pr-4 py-3 h-12 md:py-1.5 transition-colors relative z-10";

type ToggleOptionsType = "male" | "female";

const Example = () => {
  const [selected, setSelected] = useState<ToggleOptionsType>("male");
  sessionStorage.setItem("gender", "male");
  return (
    <div className="w-full flex items-center justify-center">
      <SliderToggle selected={selected} setSelected={setSelected} />
    </div>
  );
};

const SliderToggle = ({
  selected,
  setSelected,
}: {
  selected: ToggleOptionsType;
  setSelected: Dispatch<SetStateAction<ToggleOptionsType>>;
}) => {
  return (
    <div className="relative flex w-fit items-center rounded-full">
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "male" ? "text-white" : "text-muted-foreground"
        }`}
        onClick={() => {
          sessionStorage.setItem("gender", "male");
          setSelected("male");
        }}
      >
        <Swords className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Male</span>
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "female" ? "text-white" : "text-muted-foreground"
        }`}
        onClick={() => {
          sessionStorage.setItem("gender", "female");
          setSelected("female");

        }}
      >
        <Flower className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Female</span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          selected === "female" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-primary"
        />
      </div>
    </div>
  );
};

export default Example;
