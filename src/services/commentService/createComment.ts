import CommentModel from '../../models/Comment.model'

type CommentParams = {
  postId: number,
  content: string
}

export default async function createComment(params: CommentParams): Promise<CommentModel> {
  const comments = new CommentModel()
  comments.content = params.content
  comments.postId = params.postId
  await comments.save()
  return comments
}