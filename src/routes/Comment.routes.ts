import express from "express"
import CommentController from "../controllers//Comment.controller"

const commentController = new CommentController()

/**
 * Comentários
 * @tags comentários
 * @typedef {object} Comment
 * @property {number} id
 * @property {string} content
 */
const route = express.Router()

/**
 * GET /comments/{postId}
 * @summary Mostra a lista de comentários de um determinado post
 * @security BearerAuth
 * @tags comentários
 * @return {array<Comment>} 200 - succes response - application/json
 * @return {object} 400 - Bad request response
 * @param {number} postId.path.required - Id do post onde devem ser buscados os comentários
 */
route.get("/:postId", (req, res) => {
  return commentController.list(req, res)
})

/**
 * GET /comments/replies/{commentId}
 * @summary Busca um comentário e suas respostas
 * @secutiry BearerAuth
 * @tags comentários
 * @return {Comment} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 * @param {number} postId.path.required
 * @param {number} commentId.path.required
 */
route.get("/replies/:commentId", (req, res) => {
  return commentController.show(req, res)
})


/**
 * POST /comments/{postId}
 * @tags comentários
 * @summary cria um novo comentário
 * @security BearerAuth
 * @param {Comment} request.body - informações necessárias para criar um comentário
 * @param {number} postId.path.required - Id do post a ser referenciado 
 * @return {object} 200 - response
 */
route.post("/:postId/", (req, res) => {
  return commentController.create(req, res)
})

/**
 * DELETE /comments/{commentId}
 * @tags comentários
 * @summary deixa o comentário invisível para o usuário 
 * @param {number} commentId.path.required - Id do comentário a ser removido 
 * @return {object} 200 - response
 */
route.delete("/:commentId/", (req, res) => {
  return commentController.delete(req, res)
})

export default route