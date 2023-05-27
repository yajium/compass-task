import { useEffect, useState } from "react";
import AngleDownIcon from "../../assets/icon-angle-down.svg";
import { fetchFacilitators } from "../../lib/api/api";
import {
  Teacher,
  TeacherRequestParams,
  TeacherRequestType,
} from "../../lib/types/type";
import Pagination from "./Pagination";

export default function TeacherTable({
  page = "1",
  sort,
  order = "asc",
  search,
  total,
}: TeacherRequestType) {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [teachers, setTeachers] = useState<Teacher[] | null>(null);
  const [requestParams, setRequestParams] = useState<TeacherRequestParams>({
    _page: page,
    _sort: sort,
    _order: order,
    _serch: search,
  });
  console.log(requestParams);

  useEffect(() => {
    setStatus("loading");
    fetchFacilitators(requestParams)
      .then((data) => {
        setTeachers(data);
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      });
  }, [requestParams]);

  if (status === "loading") {
    return (
      <div className="text-center">
        <div className="my-4 flex justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
        <p>ロード中</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div>
        <p>通信エラーが発生しました。</p>
        <button
          type="button"
          onClick={() => {
            setStatus("loading");
            fetchFacilitators({ _page: page }).catch(() => setStatus("error"));
          }}
          className="my-4 rounded-md bg-blue-500 p-3 text-white"
        >
          リトライ
        </button>
      </div>
    );
  }

  if (!teachers || teachers.length === 0) {
    return (
      <div>
        <p>該当するデータはありません</p>
      </div>
    );
  }

  return (
    <div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="text-left text-white">
            <th className="w-4/12 border-r border-white bg-emerald-900">
              <div className="flex items-center justify-between">
                <p className="p-2 text-sm font-light">名前</p>
                <button type="button" className="px-2">
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
                <button type="button" className="px-2">
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
          {teachers.map((teacher, index) => {
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
        page={requestParams._page}
        total={total}
        setRequestParams={setRequestParams}
      />
    </div>
  );
}
