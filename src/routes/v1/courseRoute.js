import express from 'express';
import { courseAdminController, courserController, searchCourserController } from '~/controllers/courseController';
import upload from '~/middlewares/fileMiddleware.js';
import { protectedRoute } from '~/utils/protected';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/")
    .get(courserController.getCourser)
    .post(rateLimiter.Admin, protectedRoute.isAdmin, courserController.addCourser)

Router.route("/user")
    .post(courserController.checkCourseUser)

Router.route("/outstand")
    .post(courserController.outstandCourse)

Router.route("/free")
    .get(courserController.freeCourse)

Router.route("/search")
    .get(searchCourserController.searchCourses);

Router.route("/cart/")
    .post(courserController.allCourserCart)

Router.route("/image")
    .post(rateLimiter.Admin, protectedRoute.isAdmin, upload.single('file'), courserController.addImageCourses)

Router.route("/order")
    .put(rateLimiter.Admin, protectedRoute.isAdmin, courserController.putOrder)

Router.route("/sig-admin/:slug")
    .get(rateLimiter.Admin, protectedRoute.isAdmin, courserController.sigAdmin)

Router.route("/slug/:slug")
    .get(courserController.sigCourser)
    .put(rateLimiter.Admin, protectedRoute.isAdmin, courserController.updateCourseModule)

Router.route("/admin/children/:id")
    .post(rateLimiter.Admin, protectedRoute.isAdmin, courseAdminController.addModuleChildren)
    .put(rateLimiter.Admin, protectedRoute.isAdmin, courseAdminController.putModuleChildren)
    .delete(rateLimiter.Admin, protectedRoute.isAdmin, courseAdminController.delModuleChildren)

Router.route("/admin/children/:id/childId/:childId")
    .get(rateLimiter.Admin, protectedRoute.isAdmin, courseAdminController.getModuleChildren)
    .put(rateLimiter.Admin, protectedRoute.isAdmin, courseAdminController.putModuleChildren)
    .delete(rateLimiter.Admin, protectedRoute.isAdmin, courseAdminController.delModuleChildren)

Router.route("/user/module/:id")
    .get(rateLimiter.User, protectedRoute.isUser, courseAdminController.getModuleUser)

Router.route("/admin/module/:id")
    .get(rateLimiter.User, protectedRoute.isUser, courseAdminController.getModule)
    .post(rateLimiter.Admin, protectedRoute.isAdmin, courseAdminController.addModule)

Router.route("/admin/module/:id/moduleId/:moduleId")
    .put(rateLimiter.Admin, protectedRoute.isAdmin, courseAdminController.putModule)
    .delete(rateLimiter.Admin, protectedRoute.isAdmin, courseAdminController.delModule)

Router.route("/:id")
    .get(courserController.sigCourser)
    .delete(rateLimiter.Admin, protectedRoute.isAdmin, courserController.delCourser)
    .put(rateLimiter.Admin, protectedRoute.isAdmin, courserController.putCourser)

export const courserRouter = Router;