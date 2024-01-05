'use client'
export default function Select() {
  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Select 
      </label>
      <select
        id="movies"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>Get Movies By</option>
        <option value="now_playing">Now playing</option>
        <option value="popular">Popular</option>
        <option value="top_rated">Top</option>
        <option value="upcoming">Up coming</option>
      </select>
    </>
  );
}
