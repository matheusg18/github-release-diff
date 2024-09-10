type IOwner = {
  login: string;
  avatarUrl: string;
};

interface IApiSearchResponse {
  id: number;
  htmlUrl: string;
  name: string;
  fullName: string;
  description: string;
  owner: IOwner;
}

export default IApiSearchResponse;
