"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrashGame = void 0;
class CrashGame {
    constructor(minBet, maxBet) {
        this.minBet = minBet;
        this.maxBet = maxBet;
        this.currentRoundId = 0;
        this.currentBets = {};
        this.gameRounds = [];
    }
    placeBet(playerId, amount) {
        if (amount < this.minBet || amount > this.maxBet) {
            throw new Error('Invalid bet amount');
        }
        this.currentBets[playerId] = amount;
    }
    startRound() {
        const roundId = ++this.currentRoundId;
        this.gameRounds.push({ id: roundId, bets: Object.assign({}, this.currentBets) });
        return roundId;
    }
    endRound(roundId, result) {
        const roundIndex = this.gameRounds.findIndex((round) => round.id === roundId);
        if (roundIndex === -1) {
            throw new Error(`Round with id ${roundId} not found`);
        }
        this.gameRounds[roundIndex].result = result;
        this.currentBets = {};
    }
    getRound(roundId) {
        return this.gameRounds.find((round) => round.id === roundId);
    }
    // crashGameLogic.ts
    calculateCrashPoint() {
        // Generate a random number between 1.00 and 10.00
        const randomNumber = Math.floor(Math.random() * 900) + 100;
        const crashPoint = randomNumber / 100;
        return crashPoint;
    }
    payoutBet(betAmount, crashPoint) {
        // Calculate the payout amount based on the bet amount and crash point
        const payout = betAmount * crashPoint;
        return payout;
    }
    executeGame(playerId) {
        this.startRound();
        const crashPoint = this.calculateCrashPoint();
    }
}
exports.CrashGame = CrashGame;
