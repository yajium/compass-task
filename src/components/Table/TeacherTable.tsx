import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AngleDownIcon from "../../assets/icon-angle-down.svg";
import { fetchFacilitators } from "../../lib/api/api";
import { Teacher, TeacherRequestParams } from "../../lib/types/type";
import NetworkError from "../Status/Error/NetworkError";
import Loading from "../Status/Loading/Loading";
import NoData from "../Status/NoData.tsx/NoData";
import Pagination from "./Pagination";

export default function TeacherTable({
  total,
  requestParams,
  setRequestParams,
}: {
  total: number;
  requestParams: TeacherRequestParams;
  setRequestParams: Dispatch<SetStateAction<TeacherRequestParams>>;
}) {
  const [data, setData] = useState<{
    status: "loading" | "success" | "error";
    teachers: Teacher[] | null;
  }>({
    status: "loading",
    teachers: null,
  });

  useEffect(() => {
    setData({ status: "loading", teachers: null });
    fetchFacilitators(requestParams)
      .then((teachers) => {
        setData({ status: "success", teachers });
      })
      .catch(() => {
        setData({ status: "error", teachers: null });
      });
  }, [requestParams]);

  function handleSort(sortOption: "name" | "loginId") {
    setRequestParams((prev) => ({
      ...prev,
      _sort: sortOption,
      _order: prev._order === "asc" ? "desc" : "asc",
    }));
  }

  switch (data.status) {
    case "loading":
      return <Loading />;
    case "error":
      return (
        <NetworkError
          retry={() => {
            setData({ status: "loading", teachers: null });
            fetchFacilitators(requestParams).catch(() =>
              setData({ status: "error", teachers: null })
            );
          }}
        />
      );
    case "success":
      if (!data.teachers || data.teachers.length === 0) {
        return <NoData />;
      }
      break;
  }

  return (
    <div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="text-left text-white">
            <th className="w-4/12 border-r border-white bg-emerald-900">
              <div className="flex items-center justify-between">
                <p className="p-2 text-sm font-light">名前</p>
                <button
                  type="button"
                  className="px-2"
                  onClick={() => handleSort("name")}
                >
                  <img
                    src={AngleDownIcon}
                    alt="angle-down"
                    width={16}
                    height={16}
                    className="object-fit"
                  />
                </button>
              </div>
            </th>
            <th className="w-4/12 border-r border-white bg-emerald-900/80">
              <div className="flex items-center justify-between">
                <p className="p-2 text-sm font-light">ログインID</p>
                <button
                  type="button"
                  className="px-2"
                  onClick={() => handleSort("loginId")}
                >
                  <img
                    src={AngleDownIcon}
                    alt="angle-down"
                    width={16}
                    height={16}
                    className="object-fit"
                  />
                </button>
              </div>
            </th>
            <th className="w-4/12 bg-emerald-900/80"></th>
          </tr>
        </thead>
        <tbody>
          {data.teachers.map((teacher, index) => {
            const evenClass = index % 2 === 0 ? "bg-white" : "bg-gray-50";
            return (
              <tr
                key={teacher.id}
                className={`border-b border-gray-300 text-sm text-gray-600 ${evenClass}`}
              >
                <td>
                  <p className="p-3">{teacher.name}</p>
                </td>
                <td>
                  <p className="p-3">{teacher.loginId}</p>
                </td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        total={total}
        requestParams={requestParams}
        setRequestParams={setRequestParams}
      />
    </div>
  );
}
