import express from 'express';
import { orderController } from '~/controllers/orderController';
import { protectedRoute } from '~/utils/protected';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/stats")
    .get(rateLimiter.Admin, protectedRoute.isAdmin, orderController.stats)

Router.route("/weekly")
    .get(rateLimiter.Admin, protectedRoute.isAdmin, orderController.totalWeeklyRevenue)

Router.route("/total")
    .get(rateLimiter.Admin, protectedRoute.isAdmin, orderController.totalRevenue)

Router.route("/data-order")
    .post(rateLimiter.Admin, protectedRoute.isAdmin, orderController.dataOrder)

Router.route("/check-order")
    .post(orderController.checkOrder)

Router.route("/search")
    .get(rateLimiter.Admin, protectedRoute.isAdmin, orderController.searchOrder)

Router.route("/del-unpaid")
    .delete(rateLimiter.Admin, protectedRoute.isAdmin, orderController.delUnpaidOrders)

Router.route("/order-id/:orderId")
    .get(rateLimiter.User, protectedRoute.isUser, orderController.getOrderByOrderId)
    .put(rateLimiter.User, protectedRoute.isUser, orderController.putOrderByOrderId)

Router.route("/")
    .get(rateLimiter.User, protectedRoute.isUser, orderController.allOrder)
    .post(rateLimiter.User, protectedRoute.isUser, orderController.addOrder)

Router.route("/:id")
    .get(rateLimiter.User, protectedRoute.isUser, orderController.sigOrder)
    .delete(rateLimiter.Admin, protectedRoute.isAdmin, orderController.delOrder)
    .put(rateLimiter.Admin, protectedRoute.isAdmin, orderController.putOrder)

export const orderRouter = Router;