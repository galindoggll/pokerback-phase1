import Http from '../../utils/Http'
import Transformer from '../../utils/Transformer'
import * as userActions from './store/actions'

function transformResponse(params) {
  return Transformer.fetch(params)
}

export function userUpdateRequest(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.patch(`/users/${params.id}`, Transformer.send(params))
        .then(res => {
          dispatch(userActions.userUpdate(Transformer.fetch(res.data.user)))
          return resolve()
        })
        .catch((err) => {
          const statusCode = err.response.status;
          const data = {
            error: null,
            statusCode,
          };

          if (statusCode === 422) {
            const resetErrors = {
              errors: err.response.data,
              replace: false,
              searchStr: '',
              replaceStr: '',
            };
            data.error = Transformer.resetValidationFields(resetErrors);
          } else if (statusCode === 401) {
            data.error = err.response.data.message;
          }
          return reject(data);
        })
    })
  )
}

export function userDetails(id) {
  return dispatch => {
    Http.get('/info/'+ id.id)
      .then((res) => {
        dispatch(userActions.getDetails(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.log(err)
      })
  }
}
