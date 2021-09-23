import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { getAddressByCep } from 'App/Services/ViaCep'
import { schema } from 'App/Validation/CepValidator'

export default class CepsController {
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