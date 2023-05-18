"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crashGameLogic_1 = require("./crashGameLogic");
const game = new crashGameLogic_1.CrashGame(10, 100);
game.placeBet(1, 50);
game.placeBet(2, 70);
const roundId = game.startRound();
// Simulate a game result
const result = 2.5;
game.endRound(roundId, result);
const round = game.getRound(roundId);
console.log(`Round ${roundId} ended with result ${result}`);
console.log(`Bets: ${JSON.stringify(round === null || round === void 0 ? void 0 : round.bets)}`);
