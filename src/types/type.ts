export type bmiValueTypes = {
  value: number;
  category: string;
};

export type errorTypes = {
  isError: boolean;
  message: string;
};

export type logsCardProps = {
  height: string;
  weight: string;
  bmi: number;
  category: string;
  logs: Date;
};

export type BMIControlsProps = {
  onCalculate: () => void;
  onReset: () => void;
};

export type inputControlsProps = {
  selectedValue: "cmkg" | "ftlbs";
  handleControl: (value: "cmkg" | "ftlbs") => void;
};
