import CommentModel from "../../models/Comment.model"

export default async function findCommentsByPostID(postId: number): Promise<CommentModel[] | null> {
  return CommentModel.find({
    where: { 
      postId: postId,
      visible: true
    },
    relations: {
      user: true,
      post: true
    }
  })
}