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
