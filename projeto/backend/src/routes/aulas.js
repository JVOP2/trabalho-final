/**
 * Rotas de Aulas
 * @module Routes/Aulas
 */

const express = require('express');
const router = express.Router();
const aulaController = require('../controllers/aulaController');

/**
 * @swagger
 * /api/v1/aulas:
 *   post:
 *     summary: Criar nova aula
 *     tags: [Aulas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - semestre
 *               - curso
 *               - disciplina
 *               - professor
 *               - laboratorio
 *               - diaSemana
 *               - blocos
 *               - dataInicio
 *               - dataFim
 *             properties:
 *               semestre:
 *                 type: string
 *               curso:
 *                 type: string
 *               disciplina:
 *                 type: string
 *               professor:
 *                 type: string
 *               laboratorio:
 *                 type: string
 *               diaSemana:
 *                 type: string
 *                 enum: [Segunda, Terça, Quarta, Quinta, Sexta, Sábado]
 *               blocos:
 *                 type: array
 *                 items:
 *                   type: string
 *               dataInicio:
 *                 type: string
 *                 format: date
 *               dataFim:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Aula criada com sucesso
 *       409:
 *         description: Conflito de horário
 */
router.post('/', aulaController.criar);

/**
 * @swagger
 * /api/v1/aulas:
 *   get:
 *     summary: Listar aulas com filtros
 *     tags: [Aulas]
 *     parameters:
 *       - in: query
 *         name: laboratorioId
 *         schema:
 *           type: string
 *       - in: query
 *         name: professorId
 *         schema:
 *           type: string
 *       - in: query
 *         name: cursoId
 *         schema:
 *           type: string
 *       - in: query
 *         name: disciplinaId
 *         schema:
 *           type: string
 *       - in: query
 *         name: diaSemana
 *         schema:
 *           type: string
 *       - in: query
 *         name: semestre
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de aulas
 */
router.get('/', aulaController.listar);

/**
 * @swagger
 * /api/v1/aulas/grade-semanal:
 *   get:
 *     summary: Obter grade semanal
 *     tags: [Aulas]
 *     parameters:
 *       - in: query
 *         name: laboratorioId
 *         schema:
 *           type: string
 *       - in: query
 *         name: professorId
 *         schema:
 *           type: string
 *       - in: query
 *         name: semestre
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Grade semanal organizada
 */
router.get('/grade-semanal', aulaController.gradeSemanal);

/**
 * @swagger
 * /api/v1/aulas/{id}:
 *   get:
 *     summary: Buscar aula por ID
 *     tags: [Aulas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aula encontrada
 *       404:
 *         description: Aula não encontrada
 */
router.get('/:id', aulaController.buscarPorId);

/**
 * @swagger
 * /api/v1/aulas/{id}:
 *   put:
 *     summary: Atualizar aula
 *     tags: [Aulas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Aula atualizada
 *       404:
 *         description: Aula não encontrada
 *       409:
 *         description: Conflito de horário
 */
router.put('/:id', aulaController.atualizar);

/**
 * @swagger
 * /api/v1/aulas/{id}:
 *   delete:
 *     summary: Remover aula
 *     tags: [Aulas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aula removida
 *       404:
 *         description: Aula não encontrada
 */
router.delete('/:id', aulaController.remover);

module.exports = router;
