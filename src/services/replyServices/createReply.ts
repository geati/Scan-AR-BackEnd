import CommentModel from "../../models/Comment.model"

type CommentParams = {
  content: string,
  repliedCommentId: number
}

export default async function createReply(params: CommentParams) {
  const comments = new CommentModel()
  comments.content = params.content
  comments.repliedCommentId = params.repliedCommentId
  await comments.save()
  return comments
}