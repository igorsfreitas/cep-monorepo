import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export const getAddressByCep = async (cep) => {
    const requestUrl = `${Env.get('VIACEP_API_URL')}${cep}/json/`

    const response = await axios.get(requestUrl)

    if(response.data.erro) throw {message: 'CEP Inválido'}

    return response.data
}