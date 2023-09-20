import Router from 'express'
import { getUser } from '../controllers/userController.js'

const router = Router()

router.get('/', getUser)

// router.post("/register", );

// router.post("/login", );

// router.get("/:profileId", );

// router.put("/profileId",);

// Create interest in an event
// router.post("/userId/interests/:eventId", );

// Delete interest in an event
// router.delete("/:userId/interests/:eventId", );

export default router
