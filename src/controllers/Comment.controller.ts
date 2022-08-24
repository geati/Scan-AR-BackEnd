import { Request, Response} from "express"
import createComment from "..//services//commentService/createComment"
import findCommentById from "..//services//commentService/findCommentById"
import findCommentsByPostID from "..//services//commentService/findCommentsByPostId"
import findRepliesByCommentsId from "../services/replyServices/findRepliesByCommentsId"

export default class CommentController {
  /**
   * mostra todos os comentários de uma publicação
   *
   * @param request 
   * @param response 
   * @returns 
   */
  public async list(request: Request, response: Response): Promise<Response> {
    const postId = parseInt(request.params.postId)

    if(isNaN(postId)) {
      return response.status(400).send({
        message: "O parâmetro PostId tem um formato Inválido. Ele precisa ser um número"
      })
    }

    const comments = await findCommentsByPostID(postId)

    if(comments) {
      return response.send(comments)
    }

    return response.send({message: "Esse post ainda não ppssui comentários"})
  }

  /**
   * mostra um comentário e suas respostas
   */
  public async show(request: Request, response: Response): Promise<Response> {
    const commentId = parseInt(request.params.commentId) 
    
    if(isNaN(commentId)) { 
      return response.status(400).send({
        message: "O ID do comentário requisitado não existe"
      })
    }

    const comments = await findRepliesByCommentsId(commentId)

    if(comments) {
      return response.send(comments)
    }

    return response.send({ message: "Não foi possível localizar este comentário no banco de dados"})
  }

  /**
   * 
   */
  public async create(request: Request, response: Response): Promise<Response> { 
    const commentParams = {
      content: request.body.content,
    }

    const postId = parseInt(request.params.postId)

    if (commentParams.content == "") {
      return response.send({message: "O campo texto do comentário não pode estar vazio"})
    }

    if(isNaN(postId)) {
      return response.send({message: "O post que você está tentando comentar não existe"})
    }

    const comment = await createComment({content: commentParams.content, postId})

    return response.send(comment)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const commentId = parseInt(request.params.commentId)

    if (isNaN(commentId)) {
      return response.send({
        message: "O parâmetro ID tem um formato inválido"
      })
    }

    const comment = await findCommentById(commentId)

    if (comment) { 
      comment.visible = false

      comment.save()
      
      return response.send(comment)
    }

    return response.send({message: "O comentário não pôde ser apagado"})
  }
}