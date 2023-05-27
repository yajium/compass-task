import { useEffect, useState } from "react";
import SearchIcon from "../../assets/icon-search.svg";
import TeacherIcon from "../../assets/icon-teacher.svg";
import TeacherTable from "../../components/Table/TeacherTable";
import { getAllDataNums } from "../../lib/api/api";

export default function Account() {
  const [allDataNums, setAllDataNums] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllDataNums();
      setAllDataNums(data);
    };

    fetchData();
  }, []);

  function handleSearch() {
    console.log(search);
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-10">
        <div className="flex gap-3">
          <img src={TeacherIcon} alt="teacher" width={32} height={32} />
          <h2 className="text-2xl font-semibold">先生</h2>
        </div>
        <div className="rounded border border-gray-300">
          <input
            type="text"
            placeholder="名前、ログインIDで検索"
            className="py-2 pl-3 pr-20 outline-none"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            type="button"
            className="p-2 text-white"
            onClick={handleSearch}
          >
            <img src={SearchIcon} alt="search" width={20} height={20} />
          </button>
        </div>
      </div>
      <div className="my-12">
        <TeacherTable total={parseInt(allDataNums)} search={search} />
      </div>
    </div>
  );
}
