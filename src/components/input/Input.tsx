export default function Input({
  id,
  name,
  placeholder,
  type,
  onChange,
  title,
  className,
}: {
  id: string;
  name: string;
  placeholder: string;
  type: string;
  onChange?: any;
  title: string;
  className?: string;
}) {
  return (
    <div className="relative py-1">
      <input
        type={type}
        id={id}
        name={name}
        className={`${className} block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm bg-gray-700 border appearance-none text-white border-gray-600 dark:focus:border-blue-800 focus:outline-none focus:ring-0 focus:border-blue-600 peer disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
        invalid:border-red-500 invalid:text-red-500
        focus:invalid:border-red-500 focus:invalid:ring-red-500`}
        placeholder={placeholder}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="absolute text-sm mt-1 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
      >
        {title}
      </label>
    </div>
  );
}
