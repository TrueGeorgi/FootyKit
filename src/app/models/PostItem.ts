import { PostComment } from "./PostComment";

export interface PostItem {
    id: string;
    name: string;
    img: string;
    likes: number;
    dislikes: number;
    // comments: PostComment[];
}