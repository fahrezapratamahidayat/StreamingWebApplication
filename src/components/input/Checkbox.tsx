export default function Checkbox({ id, name,title,onChange }: any) {
  return (
    <>
      <input
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        id={id}
        name={name}
        type="checkbox"
        onChange={onChange}
      />
      <label
        className="ml-2 block text-sm text-gray-900 dark:text-gray-200"
        htmlFor={id}
      >
        {title}
      </label>
    </>
  );
}
