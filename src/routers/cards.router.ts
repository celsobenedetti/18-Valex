import { Router } from "express";
import cardsController from "../controllers/cards.controller";
import validadeApiKeyHeader from "../middleware/auth/apiKeyHeader";
import verifyCardIsValidByParams from "../middleware/cards/verifyCardByParams";
import validateBody from "../middleware/validation/zod";
import {
  activateCardSchema,
  passwordBodySchema,
  createCardSchema,
  rechargeCardSchema,
} from "../schemas/cards/requests";

const router = Router();

router.post(
  "/cards",
  validadeApiKeyHeader,
  validateBody(createCardSchema),
  cardsController.createCard,
);

router.post(
  "/cards/:id/recharge",
  validadeApiKeyHeader,
  validateBody(rechargeCardSchema),
  verifyCardIsValidByParams,
  cardsController.rechargeCard,
);

router.post(
  "/cards/:id/activate",
  validateBody(activateCardSchema),
  verifyCardIsValidByParams,
  cardsController.activateCard,
);

router.post(
  "/cards/:id/block",
  validateBody(passwordBodySchema),
  verifyCardIsValidByParams,
  cardsController.blockCard,
);

router.post(
  "/cards/:id/unblock",
  validateBody(passwordBodySchema),
  verifyCardIsValidByParams,
  cardsController.unblockCard,
);

router.get("/cards/:id/balance", cardsController.getBalance);

export default router;
