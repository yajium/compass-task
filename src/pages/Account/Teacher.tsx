import { useEffect, useRef, useState } from "react";
import SearchIcon from "../../assets/icon-search.svg";
import TeacherIcon from "../../assets/icon-teacher.svg";
import NetworkError from "../../components/Status/Error/NetworkError";
import Loading from "../../components/Status/Loading/Loading";
import NoData from "../../components/Status/NoData.tsx/NoData";
import Pagination from "../../components/Table/Pagination";
import TeacherTable, {
  TeacherTableProps,
} from "../../components/Table/TeacherTable";
import { fetchFacilitators, getAllDataNums } from "../../lib/api/api";
import { Teacher as TeacherData, TeacherRequestParams } from "../../types/type";

const TableContent = ({
  status,
  ...teacherTableProps
}: { status: "loading" | "success" | "error" } & TeacherTableProps) => {
  if (status === "loading") {
    return <Loading />;
  }

  if (status === "success") {
    if (
      !teacherTableProps.teachers ||
      teacherTableProps.teachers.length === 0
    ) {
      return <NoData />;
    }
  }

  return <TeacherTable {...teacherTableProps} />;
};

export default function Teacher() {
  const [allDataNums, setAllDataNums] = useState("");
  const [data, setData] = useState<{
    status: "loading" | "success" | "error";
    teachers: TeacherData[] | null;
  }>({
    status: "loading",
    teachers: null,
  });
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
    setData({ ...data, status: "loading" });
    getAllDataNums()
      .then((res) => {
        setAllDataNums(res);
        setData({ ...data, status: "success" });
      })
      .catch(() => {
        setData({ ...data, status: "error" });
      });
  }

  function handleSearch() {
    if (!serchInputRef.current) return;
    setRequestParams((prev) => ({
      ...prev,
      _search: serchInputRef.current?.value,
    }));
  }

  function handleSort(sortOption: "name" | "loginId") {
    setRequestParams((prev) => ({
      ...prev,
      _sort: sortOption,
      _order: prev._order === "asc" ? "desc" : "asc",
    }));
  }

  useEffect(() => {
    setData({ status: "loading", teachers: null });
    fetchFacilitators(requestParams)
      .then((teachers) => {
        setData({ status: "success", teachers });
      })
      .catch(() => {
        setData({ ...data, status: "error" });
      });

    return () => {
      setData({ status: "loading", teachers: null });
    };
  }, [requestParams]);

  if (data.status === "error") return <NetworkError retry={fetchData} />;

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
        <TableContent
          status={data.status}
          teachers={data.teachers || []}
          onSort={handleSort}
        />
        <Pagination
          total={parseInt(allDataNums)}
          requestParams={requestParams}
          setRequestParams={setRequestParams}
        />
      </div>
    </div>
  );
}
