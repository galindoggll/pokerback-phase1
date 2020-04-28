import { combineReducers } from 'redux'

import auth from '../modules/auth/store/reduer'
import user from '../modules/user/store/reducer'
import articles from '../modules/article/store/reducer'
import players from '../modules/players/store/reducer'
import agents from '../modules/agent/store/reducer'

export default combineReducers({ auth, user, articles, players, agents })
