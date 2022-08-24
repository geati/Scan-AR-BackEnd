import CommentModel from "../../models/Comment.model"

export default function findRepliesByCommentsId(commentId: number): Promise<CommentModel | null> {
  return CommentModel.findOne({
    where: { repliedCommentId: commentId },
    relations: {
      repliedComment: true
    }
  })
}