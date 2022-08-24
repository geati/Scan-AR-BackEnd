import CommentModel from "../../models/Comment.model";

export default async function(commentId: number): Promise<CommentModel | null> {
  const comment = await CommentModel.findOne({
    where: {
      id: commentId,
      visible: true
    }
  })

  return comment
}
