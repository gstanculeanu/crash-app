interface GameRound {
    id: number;
    bets: { [playerId: number]: number };
    result?: number;
  }
  
 export class CrashGame {
    private currentRoundId = 0;
    private currentBets: { [playerId: number]: number } = {};
    private gameRounds: GameRound[] = [];
  
    constructor(private minBet: number, private maxBet: number) {}
  
    placeBet(playerId: number, amount: number): void {
      if (amount < this.minBet || amount > this.maxBet) {
        throw new Error('Invalid bet amount');
      }
  
      this.currentBets[playerId] = amount;
    }
  
    startRound(): number {
      const roundId = ++this.currentRoundId;
      this.gameRounds.push({ id: roundId, bets: { ...this.currentBets } });
      return roundId;
    }
  
    endRound(roundId: number, result: number): void {
      const roundIndex = this.gameRounds.findIndex((round) => round.id === roundId);
  
      if (roundIndex === -1) {
        throw new Error(`Round with id ${roundId} not found`);
      }
  
      this.gameRounds[roundIndex].result = result;
      this.currentBets = {};
    }
  
    getRound(roundId: number): GameRound | undefined {
      return this.gameRounds.find((round) => round.id === roundId);
    }
    // crashGameLogic.ts

  calculateCrashPoint(): number {
    // Generate a random number between 1.00 and 10.00
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    const crashPoint = randomNumber / 100;
    return crashPoint;
  }
  
    payoutBet(betAmount: number, crashPoint: number): number {
    // Calculate the payout amount based on the bet amount and crash point
    const payout = betAmount * crashPoint;
    return payout;
  }
  executeGame(playerId:number){
    this.startRound();
    const crashPoint= this.calculateCrashPoint();
    

  }
  }
  