import axios from "axios";
import {
  ExtendedTeacherRequestParams,
  TeacherRequestParams,
} from "../types/type";

const endPoint =
  "https://us-central1-compass-hr.cloudfunctions.net/mock/facilitators";

export async function fetchFacilitators({
  _page = "1",
  _limit = "20",
  _sort,
  _order = "asc",
  _search,
}: TeacherRequestParams): Promise<any> {
  const params: ExtendedTeacherRequestParams = {
    _page,
    _limit,
    _sort,
    _order,
  };

  if (_search) {
    params["name_like"] = _search;
    params["loginId_like"] = _search;
  }

  const res = await axios
    .get(endPoint, { params })
    .then((response) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(response.data), 1000); // ローダー表示のため1秒遅らせる
      });
    })
    .catch((error) => {
      throw error;
    });
  return res;
}

export async function getAllDataNums() {
  const res = await axios
    .get(endPoint)
    .then((response) => {
      return response.data.length;
    })
    .catch((error) => {
      console.log("通信エラーが発生しました。", error);
      throw error;
    });
  return res;
}
