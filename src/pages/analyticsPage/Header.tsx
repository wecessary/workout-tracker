const cardsWidth = "w-[95vw]";
export const Header = ({ text }: { text: string }) => {
  return (
    <h1
      className={`${cardsWidth} text-[6vw] font-bold border-t-2 border-b-2 border-white tracking-widest`}
    >
      {text}
    </h1>
  );
};
