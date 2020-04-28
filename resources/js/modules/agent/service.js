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
    Http.get('/info/'+ id.id)
      .then((res) => {
        dispatch(agentActions.detail(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.log(err)
      })
  }
}
