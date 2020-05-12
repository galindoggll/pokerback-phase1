import Http from '../../utils/Http'
import Transformer from '../../utils/Transformer'
import * as agentActions from './store/actions'

function transformRequest(parms) {
  return Transformer.send(parms)
}

function transformResponse(params) {
  return Transformer.fetch(params)
}

export function agentListRequest({pageNumber = 1, url = '/agents'}) {
  return dispatch => {
    if (pageNumber > 1) {
      url = url + `?page=${pageNumber}`
    }

    Http.get(url)
      .then((res) => {
        dispatch(agentActions.list(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}

export function agentDetails(id) {
  return dispatch => {
    Http.get('/info/'+ parseInt(id.id))
      .then((res) => {
        dispatch(agentActions.detail(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.log(err)
      })
  }
}

export function unassignedPlayers() {
  return dispatch => {
    Http.get('/players-unassigned')
      .then((res) => {
        dispatch(agentActions.playerList(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.log(err)
      })
  }
}

export function assignPlayers(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('/assign-players', params)
        .then(res => {
          dispatch(agentActions.assignPlayers(transformResponse(res.data)))
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
