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
  bmi?: number;
  category?: string;
  bmr?: number;
  age?: number;
  gender?: string;
  exercise?: Array<number>;
  logs: Date;
};

export type cardPropsContainer = {
  data: logsCardProps;
  type: string;
};

export type BMIControlsProps = {
  onCalculate: () => void;
  onReset: () => void;
};

export type inputControlsProps = {
  selectedValue: "cmkg" | "ftlbs";
  handleControl: (value: "cmkg" | "ftlbs") => void;
};
