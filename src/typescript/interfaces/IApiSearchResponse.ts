type IOwner = {
  login: string;
};

interface IApiSearchResponse {
  htmlUrl: string;
  name: string;
  fullName: string;
  description: string;
  owner: IOwner;
}

export default IApiSearchResponse;
