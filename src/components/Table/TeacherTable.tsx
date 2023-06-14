import AngleDownIcon from "../../assets/icon-angle-down.svg";
import { Teacher } from "../../types/type";

export type TeacherTableProps = {
  teachers: Teacher[];
  onSort: (sortOption: "name" | "loginId") => void;
};

// 名前とログインIDだけを持たせる
export default function TeacherTable({ teachers, onSort }: TeacherTableProps) {
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
                  onClick={() => onSort("name")}
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
                  onClick={() => onSort("loginId")}
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
    </div>
  );
}
