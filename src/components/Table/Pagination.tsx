import { Dispatch, SetStateAction } from "react";
import AngleLeftIcon from "../../assets/icon-angle-left.svg";
import AngleRightIcon from "../../assets/icon-angle-right.svg";
import { TeacherRequestParams } from "../../lib/types/type";

export default function Pagination({
  page,
  total,
  limit = "20",
  setRequestParams,
}: {
  page: string;
  total: number;
  limit?: string;
  setRequestParams: Dispatch<SetStateAction<TeacherRequestParams>>;
}) {
  // ページネーション：n〜n+limit件を表示する部分
  const startIndex = (parseInt(page) - 1) * 20 + 1;
  let endIndex = parseInt(page) * parseInt(limit);

  if (endIndex > total) {
    endIndex = total;
  }

  // ページネーション：ページ番号を表示する部分
  const totalPageNumber = Math.ceil(total / parseInt(limit));
  const pages = Array.from({ length: totalPageNumber }, (_, i) => i + 1);

  function handlePagenate(page: number) {
    setRequestParams((prev) => ({ ...prev, _page: page.toString() }));
  }

  return (
    <div className="my-4 flex items-center justify-between">
      <div>
        <p className="text-gray-500">
          {total}件中 {startIndex}〜{endIndex}件を表示
        </p>
      </div>
      <div className="flex flex-row items-center">
        <button
          type="button"
          disabled={page === "1"}
          className="mx-2 rounded bg-gray-200 px-3 py-2 text-white"
          onClick={() => handlePagenate(parseInt(page) - 1)}
        >
          <img src={AngleLeftIcon} alt="angle-left" width={16} height={16} />
        </button>
        {pages.map((pageNumber) => {
          const isActive = pageNumber === parseInt(page);
          return (
            <button
              key={pageNumber}
              type="button"
              disabled={isActive}
              className={`mx-2 rounded px-3 py-1 ${
                isActive ? "bg-emerald-900 text-white" : "bg-gray-200"
              }`}
              onClick={() => handlePagenate(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          type="button"
          disabled={page === totalPageNumber.toString()}
          className="mx-2 rounded bg-gray-200 px-3 py-2 text-white"
          onClick={() => handlePagenate(parseInt(page) + 1)}
        >
          <img src={AngleRightIcon} alt="angle-left" width={16} height={16} />
        </button>
      </div>
    </div>
  );
}
