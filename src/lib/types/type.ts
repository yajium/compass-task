export type Teacher = {
  id: string;
  loginId: string;
  name: string;
};

export type TeacherRequestParams = {
  _page: string;
  _limit?: string;
  _sort?: "name" | "loginId";
  _order?: "desc" | "asc";
  _serch?: string;
};

export type TeacherRequestType = {
  page?: string;
  limit?: string;
  sort?: "name" | "loginId";
  order?: "desc" | "asc";
  search?: string;
  total: number;
};
