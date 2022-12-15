import { SetStateAction } from "react";
import { ArrowLeft } from "../../components/Icons";
import {
  getMax,
  getMean,
  getMin,
} from "../../dataAnalysis/dataWrangleFunctions";

const ThisWeekVsAllTime = ({
  lastWeekUniqueNames,
  setExercise,
  cardsWidth,
  exWeights,
  exAllWeights,
  exReps,
  exAllReps,
}: {
  lastWeekUniqueNames: string[];
  setExercise: (value: SetStateAction<string>) => void;
  cardsWidth: string;
  exWeights: number[];
  exAllWeights: number[];
  exReps: number[];
  exAllReps: number[];
}) => {
  return (
    <div
      className={`${cardsWidth} rounded-lg bg-[#1F1F1F] grid grid-rows-6 pt-4`}
    >
      <div className="row-span-1">
        <div className="flex items-center gap-2">
          <select
            className="bg-[#1F1F1F] text-[8vw] ml-4"
            onChange={(e) => {
              setExercise(e.target.value);
            }}
            onBlur={(e) => {
              setExercise(e.target.value);
            }}
          >
            <option>{lastWeekUniqueNames[0]}</option>
            {lastWeekUniqueNames.map((name) => {
              if (name === lastWeekUniqueNames[0]) {
                return null;
              }
              return <option>{name}</option>;
            })}
          </select>
          <ArrowLeft />
        </div>
      </div>
      <div className="row-span-1">
        <div className="grid grid-cols-12 justify-items-center items-center ">
          <div className="col-start-7 col-span-2">
            <div className="text-[4vw] font-bold flex flex-col">
              <h1>THIS </h1>
              <h1>WEEK</h1>
            </div>
          </div>
          <div className="text-[4vw] col-span-1">
            <h1>VS</h1>
          </div>
          <div className="text-[4vw] font-bold col-span-2 ">
            <div className="flex flex-col">
              <h1>ALL </h1>
              <h1>TIME</h1>
            </div>
          </div>
          <div className="col-start-4 col-span-9 border-t-2 w-full"></div>
        </div>
      </div>
      <div className="row-span-2">
        <div className="grid grid-cols-12">
          <h1
            style={{ writingMode: "vertical-lr" }}
            className="text-[20vw] col-start-1 col-span-3"
          >
            KG
          </h1>
          <div className="col-span-2 flex flex-col text-[6vw] ">
            <h1 className="underline underline-offset-2 font-semibold">MAX</h1>
            <h1 className="underline underline-offset-2 font-semibold">MEAN</h1>
            <h1 className="underline underline-offset-2 font-semibold">MIN</h1>
          </div>
          <div className="col-start-7 col-span-2 flex flex-col text-[6vw] ">
            <h1>{getMax(exWeights)}</h1>
            <h1>{getMean(exWeights)}</h1>
            <h1>{getMin(exWeights)}</h1>
          </div>
          <div className="col-start-10 col-span-2 flex flex-col text-[6vw] ">
            <h1>{getMax(exAllWeights)}</h1>
            <h1>{getMean(exAllWeights)}</h1>
            <h1>{getMin(exAllWeights)}</h1>
          </div>
        </div>
      </div>
      <div className="row-span-2 ">
        <div className="grid grid-cols-12">
          <h1
            style={{ writingMode: "vertical-lr" }}
            className="text-[20vw] col-start-1 col-span-3"
          >
            REPS
          </h1>
          <div className="col-span-2 flex flex-col text-[6vw] ">
            <h1 className="underline underline-offset-2 font-semibold">MAX</h1>
            <h1 className="underline underline-offset-2 font-semibold">MEAN</h1>
            <h1 className="underline underline-offset-2 font-semibold">MIN</h1>
          </div>
          <div className="col-start-7 col-span-2 flex flex-col text-[6vw]">
            <h1>{getMax(exReps)}</h1>
            <h1>{getMean(exReps)}</h1>
            <h1>{getMin(exReps)}</h1>
          </div>
          <div className="col-start-10 col-span-2 flex flex-col text-[6vw]">
            <h1>{getMax(exAllReps)}</h1>
            <h1>{getMean(exAllReps)}</h1>
            <h1>{getMin(exAllReps)}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThisWeekVsAllTime;
