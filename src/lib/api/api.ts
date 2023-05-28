import axios from "axios";
import {
  ExtendedTeacherRequestParams,
  TeacherRequestParams,
} from "../../types/type";

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

  // 検索ワードがないとき
  if (!_search) {
    const res = await axios
      .get(endPoint, { params })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
    return res;
  }

  // 検索ワードがある場合、名前/ログインIDを同時に検索はできないので名前から検索する
  const resWord = await axios
    .get(endPoint, { params: { ...params, name_like: _search } })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
  if (resWord.length > 0) return resWord;

  // 名前検索の結果が0件の場合はログインIDから検索する
  const resLoginId = await axios
    .get(endPoint, { params: { ...params, loginId_like: _search } })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });

  return resLoginId;
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
