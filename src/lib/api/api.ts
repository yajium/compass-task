import axios from "axios";
import { TeacherRequestParams } from "../types/type";

const endPoint =
  "https://us-central1-compass-hr.cloudfunctions.net/mock/facilitators";

export async function fetchFacilitators({
  _page,
  _limit,
  _sort,
  _order,
  _serch,
}: TeacherRequestParams): Promise<any> {
  if (_serch === "" || !_serch) {
    const res = await axios
      .get(endPoint, {
        params: {
          _page,
          _limit,
          _sort,
          _order,
        },
      })
      .then((response) => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(response.data), 1000); // 1秒遅らせる
        });
      })
      .catch((error) => {
        throw error;
      });
    return res;
  } else {
    const resName = await axios
      .get(endPoint, {
        params: {
          _page,
          _limit,
          _sort,
          _order,
          name_like: _serch,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
    if (resName && resName.length > 0) {
      return resName;
    }
    const resLoginId = await axios
      .get(endPoint, {
        params: {
          _page,
          _limit,
          _sort,
          _order,
          loginId_like: _serch,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
    return resLoginId;
  }
}

export async function getAllDataNums() {
  const res = await axios
    .get("https://us-central1-compass-hr.cloudfunctions.net/mock/facilitators")
    .then((response) => {
      return response.data.length;
    })
    .catch((error) => {
      console.log("通信エラーが発生しました。", error);
      throw error;
    });
  return res;
}
