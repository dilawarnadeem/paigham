export interface IScholorType {
     name?: string;
     image?: string;
 }

export interface IPost {
    title: string,
    slug:string,
    categories:any,
    featuredImage:any,
    postInfo:IPostInfo
}
export interface IPostInfo {
    tmVideoUrl:string
}