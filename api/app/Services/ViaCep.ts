import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export const getAddressesByCepService = async (cep) => {
    const requestUrlByCep = `${Env.get('VIACEP_API_URL')}${cep}/json/`

    const addressByCep = await axios.get(requestUrlByCep)

    if(addressByCep.data.erro) throw {message: 'CEP Inválido'}

    const requestUrlByLocality = encodeURI(`${Env.get('VIACEP_API_URL')}${addressByCep.data.uf}/${addressByCep.data.localidade}/${addressByCep.data.logradouro}/json/`)

    const addresses = await axios.get(requestUrlByLocality)

    return addresses.data
}