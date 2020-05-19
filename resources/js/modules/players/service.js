import Http from '../../utils/Http'
import Transformer from '../../utils/Transformer'
import * as playerActions from './store/actions'

const FileDownload = require('js-file-download');

function transformRequest(parms) {
  return Transformer.send(parms)
}

function transformResponse(params) {
  return Transformer.fetch(params)
}

export function playerListRequest({pageNumber = 1, url = '/players'}) {
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
    Http.get('/player/'+ parseInt(player.id) + '/' + parseInt(player.type))
      .then((res) => {
        dispatch(playerActions.detail(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}

export function updatePlayer(player) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('/update-player', player)
        .then(res => {
          dispatch(playerActions.update(transformResponse(res.data)))
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

export function importData(params) {
  return dispatch => {
    Http.post('/import', params)
      .then((res) => {
        dispatch(playerActions.importData(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}

export function playerListOfAgentRequest({pageNumber = 1, url = '/agent/players/', params}) {
  return dispatch => {
    let url1 = url + params.id;
    if (pageNumber > 1) {
      url1 = url1 + `?page=${pageNumber}`
    }
    Http.get(url1)
      .then((res) => {
        dispatch(playerActions.agentPlayerList(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}

export function exportPlayer() {
  return dispatch => {
    Http.get('export').then((res) => {
      console.log(res)
      FileDownload(res.data, 'player.csv');
    }).catch((err) => {
      // TODO: handle err
      console.error(err.response)
    })
  }
}
