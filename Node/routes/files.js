const { Router } = require('express')
const { getFilesData, getFilesList } = require('../controllers/files')

const router = Router()

/**
 * @openapi
 * paths:
 *   /files/data:
 *     get:
 *       tags:
 *         - Files
 *       parameters:
 *         - in: query
 *           name: fileName
 *           description: name of the file to get.
 *           required: false
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Request was successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     file:
 *                       type: string
 *                       example: "file1.csv"
 *                     lines:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           file:
 *                             type: string
 *                             example: "file1.csv"
 *                           text:
 *                             type: string
 *                             example: "UqiZKpsjST"
 *                           number:
 *                             type: string
 *                             example: "9509"
 *                           hex:
 *                             type: string
 *                             example: "205fa6c790cc371a27199e75e7aae8ad"
 *
 */
router.get('/data', getFilesData)

/**
* @openapi
 * paths:
 *   /files/lists:
 *     get:
 *       tags:
 *         - Files
 *       parameters:
 *         - in: query
 *           name: fileName
 *           description: name of the file to get.
 *           required: false
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Request was successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   files:
 *                    type: array
 *                    items:
 *                      type: string
 *                      example: "file1.csv"
 */
router.get('/lists', getFilesList)

module.exports = router
