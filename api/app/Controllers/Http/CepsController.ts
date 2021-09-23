import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { getAddressByCep } from 'App/Services/ViaCep'
import { schema } from 'App/Validation/CepValidator'

export default class CepsController {

  /**
  * @swagger
  * /address:
  *   get:
  *     tags:
  *       - Address, CEP
  *     summary: Get Address By CEP API
  *     parameters:
  *       - name: cep
  *         description: CEP of the required Address
  *         in: query
  *         required: true
  *         type: string
  *     responses:
  *       200:
  *         description: Send Address for this cep
  *         example:
  *           properties:
  *            address:
  *              type: object
  *       400:
  *         description: Throws validations errors or wrong cep error
  *         example:
  *           properties:
  *            errors:
  *              type: object
  */
  public async getAddressByCep({request, response}: HttpContextContract) {

    const requestData = request.all()

    try {
        await schema.validate(requestData)
        const address = await getAddressByCep(requestData.cep)
        
        return response.send({address})
    } catch (error) {
        return response.status(400).send({
            errors: error.errors,
            message: error.message,
        })
    }
    
  }
}