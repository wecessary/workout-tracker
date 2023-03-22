export type Gap = `gap-${number}`;
export type AlignItem = `items-${
  | "start"
  | "end"
  | "center"
  | "baseline"
  | "stretch"}`;
export type P =
  | `p-${number}`
  | `px-${number}`
  | `py-${number}`
  | `pt-${number}`
  | `pb-${number}`
  | `pl-${number}`
  | `pr-${number}`;
export type Border =
  | `border-${number}`
  | `border-b-${number}`
  | `border-t-${number}`
  | `border-l-${number}`
  | `border-r-${number}`;

export interface ClassName {
  className?: string;
}
