import Router from 'express'
import { userProfile } from '../controllers/userController.js'
// import { profile } from '../controllers/userController.js'

const router = Router()

router.get('/', userProfile)

// router.post("/register", );

// router.post("/login", );

// router.get("/:profileId", profile );

// router.put("/:profileId",);

// Create interest in an event
// router.post("/userId/interests/:eventId", );

// Delete interest in an event
// router.delete("/:userId/interests/:eventId", );

export default router
