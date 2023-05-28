import { useEffect, useRef, useState } from "react";
import SearchIcon from "../../assets/icon-search.svg";
import TeacherIcon from "../../assets/icon-teacher.svg";
import NetworkError from "../../components/Status/Error/NetworkError";
import TeacherTable from "../../components/Table/TeacherTable";
import { getAllDataNums } from "../../lib/api/api";
import { TeacherRequestParams } from "../../types/type";

export default function Account() {
  const [allDataNums, setAllDataNums] = useState("");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const serchInputRef = useRef<HTMLInputElement>(null);
  const [requestParams, setRequestParams] = useState<TeacherRequestParams>({
    _page: "1",
    _limit: "20",
    _sort: undefined,
    _order: "asc",
    _search: undefined,
  });

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    setStatus("loading");
    getAllDataNums()
      .then(setAllDataNums)
      .catch(() => {
        setStatus("error");
      });
  }

  function handleSearch() {
    if (!serchInputRef.current) return;
    setRequestParams((prev) => ({
      ...prev,
      _search: serchInputRef.current?.value,
    }));
  }

  if (status === "error") {
    return <NetworkError retry={fetchData} />;
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
            name="serch"
            placeholder="名前、ログインIDで検索"
            className="py-2 pl-3 pr-20 outline-none"
            ref={serchInputRef}
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
        <TeacherTable
          total={parseInt(allDataNums)}
          requestParams={requestParams}
          setRequestParams={setRequestParams}
        />
      </div>
    </div>
  );
}
