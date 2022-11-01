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
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </span>
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        id={id}
        className="sr-only peer"
      />
      <div className="ml-3 mb-3 w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[20px] after:left-[12px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  );
};

export default Toggle;
