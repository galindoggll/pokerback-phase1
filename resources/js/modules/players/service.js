import Http from '../../utils/Http'
import Transformer from '../../utils/Transformer'
import * as playerActions from './store/actions'

function transformRequest(parms) {
  return Transformer.send(parms)
}

function transformResponse(params) {
  return Transformer.fetch(params)
}

export function playerListRequest({pageNumber = 1, url = '/details'}) {
  return dispatch => {
    if (pageNumber > 1) {
      url = url + `?page=${pageNumber}`
    }

    Http.get(url)
      .then((res) => {
        dispatch(playerActions.list(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}

export function playerDetailRequest(player) {
  return dispatch => {
    Http.get('/showDetail/'+ player.id)
      .then((res) => {
        dispatch(playerActions.detail(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}
