export const Header = ({
  text,
  cardsWidth,
}: {
  text: string;
  cardsWidth: string;
}) => {
  return (
    <h1
      className={`${cardsWidth} text-[6vw] font-bold border-t-2 border-b-2 border-white tracking-widest`}
    >
      {text}
    </h1>
  );
};
