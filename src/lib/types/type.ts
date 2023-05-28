export type Teacher = {
  id: string;
  loginId: string;
  name: string;
};

export type TeacherRequestParams = {
  _page: string;
  _limit: string;
  _sort?: "name" | "loginId";
  _order?: "desc" | "asc";
  _search?: string;
};

export type ExtendedTeacherRequestParams = TeacherRequestParams & {
  name_like?: string;
  loginId_like?: string;
};

export type TeacherRequestType = {
  limit?: string;
  sort?: "name" | "loginId";
  order?: "desc" | "asc";
  search?: string;
  total: number;
};
