// import modular routes
import webRoutes from "../modules/web/routes"
import authRoutes from "../modules/auth/routes"
import userRoutes from "../modules/user/routes"
import playerRoutes from "../modules/players/routes"
import agentRoutes from "../modules/agent/routes"

export default [...webRoutes, ...authRoutes, ...userRoutes, ...agentRoutes, ...playerRoutes]
