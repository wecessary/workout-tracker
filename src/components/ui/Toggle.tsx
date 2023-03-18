const Toggle = ({
  value,
  onChange,
  label,
  id,
}: {
  value?: boolean;
  onChange?: () => void;
  label?: string;
  id: string;
}) => {
  return (
    <label
      htmlFor={id}
      className="inline-flex flex-col relative cursor-pointer"
    >
      <span className="ml-3 text-sm font-medium text-black">{label}</span>
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        id={id}
        className="sr-only peer"
      />
      <div className="ml-3 mb-3 w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[20px] after:left-[12px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
    </label>
  );
};

export default Toggle;
