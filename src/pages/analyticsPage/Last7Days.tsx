import { milSecToMin } from "../../utilities/date";
import { Header } from "./Header";

const Last7Days = ({
  cardsWidth,
  daysWorkedOut,
  numExDone,
  restTime,
  timeExercising,
  numSetsDone,
}: {
  cardsWidth: string;
  daysWorkedOut: number;
  numExDone: number;
  restTime: number;
  timeExercising: number;
  numSetsDone: number;
}) => {
  return (
    <>
      <Header text="LAST 7 DAYS" cardsWidth={cardsWidth} />
      <div
        className={`${cardsWidth} grid grid-cols-12 border-black border bg-[#1F1F1F] rounded-lg py-4`}
      >
        <div className="col-start-2 col-span-3 flex flex-col">
          <div>
            <span className="text-[15vw]">{daysWorkedOut}</span>
            <span className="text-[4vw]">DAYS</span>
          </div>
          <div>
            <span className="text-[15vw]">{numExDone}</span>
            <span className="text-[4vw]">EXERCISES</span>
          </div>
        </div>
        <div className="col-start-7 col-span-3 flex flex-col">
          <div>
            <span className="text-[15vw]">
              {milSecToMin(restTime + timeExercising)}
            </span>
            <span className="text-[4vw]">MINUTES</span>
          </div>
          <div>
            <span className="text-[15vw]">{numSetsDone}</span>
            <span className="text-[4vw]">SETS</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Last7Days;
