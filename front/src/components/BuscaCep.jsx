import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputMask from 'react-input-mask';
import { useSelector, useDispatch } from 'react-redux'
import { getAddressByCep, getAddress } from '../slices/addressSlice'
import Alert from '@material-ui/lab/Alert'

export default function CustomizedDialogs({open, handleClose, avaibleUsers, selectedOffer}) {

  const [cep, setCep] = React.useState('');

  const addresses = useSelector((state) => state.address)
  const dispatch = useDispatch()

  const onChange = (event) => {
    setCep(event.target.value);
  }

  return (
    <div>
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Endereço
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
          <InputMask
            mask="99999-999"
            value={cep}
            maskChar=" "
            onChange={onChange}
          >
            {() => <TextField
              required
              id="zip"
              name="zip"
              label="CEP"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
            />}
          </InputMask>
            
          </Grid>
          <Grid item xs={12} sm={3}>
            { addresses.status === 'loading' ? <CircularProgress /> : <Button
              variant="contained"
              onClick={() => dispatch(getAddressByCep(cep.split('-').join('')))}
              sx={{ mt: 3, ml: 1 }}
              disabled={addresses.status === 'loading'}
            >
              Buscar CEP
            </Button>}
          </Grid>
          <Grid item xs={12}>
            { addresses.status === 'failed' ? <Alert severity="error">Cep Inválido</Alert> : null }
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address1"
              name="address1"
              label={'Logradouro'}
              fullWidth
              autoComplete="shipping address-line1"
              variant="outlined"
              value={addresses.status === 'failed' ? '' : addresses.latest?.logradouro}
              disabled
              InputLabelProps={{shrink: true}}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label={'Bairro'}
              fullWidth
              autoComplete="shipping address-line2"
              variant="outlined"
              value={addresses.status === 'failed' ? '' : addresses.latest?.bairro}
              disabled
              InputLabelProps={{shrink: true}}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="city"
              name="city"
              label={'Cidade'}
              fullWidth
              variant="outlined"
              value={addresses.status === 'failed' ? '' : addresses.latest?.localidade}
              disabled
              InputLabelProps={{shrink: true}}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label={'Estado'}
              fullWidth
              variant="outlined"
              value={addresses.status === 'failed' ? '' : addresses.latest?.uf}
              disabled
              InputLabelProps={{shrink: true}}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    </div>
  );
}