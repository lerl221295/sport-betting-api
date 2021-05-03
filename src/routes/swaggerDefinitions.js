/**
 * @swagger
 *
 * definitions:
 *
 *  GamesList:
 *      type: array
 *      description: something
 *      items:
 *          $ref: '#/definitions/Game'
 *  BetsList:
 *      type: array
 *      items:
 *          $ref: '#/definitions/Bet'
 *
 *  UserBalance:
 *      type: object
 *      properties:
 *          balance:
 *              type: number
 *              example: 100
 *
 *  Bet:
 *      type: object
 *      properties:
 *          betId:
 *              type: string
 *          gameId:
 *              type: number
 *          userAId:
 *              type: string
 *          userATeam:
 *              type: number
 *          amount:
 *              type: number
 *              example: 100
 *          userBId:
 *              type: string
 *          userBTeam:
 *              type: number
 *          createdAt:
 *              type: string
 *
 *  CreateBet:
 *      type: object
 *      properties:
 *          gameId:
 *              type: number
 *              required: true
 *          userId:
 *              type: string
 *              required: true
 *          teamId:
 *              type: number
 *              required: true
 *          amount:
 *              type: number
 *              example: 100
 *              required: true
 *
 *  Game:
 *      type: object
 *      properties:
 *          gameId:
 *              type: number
 *          homeTeamId:
 *              type: string
 *          awayTeamId:
 *              type: string
 *          startDateTime:
 *              type: string
 *          sport:
 *              type: string
 *          playingSurface:
 *              type: string
 *          capacity:
 *              type: number
 *          windSpeed:
 *              type: number
 *          windChill:
 *              type: number
 *          channel:
 *              type: string
 *          homeRotationNumber:
 *              type: number
 *          awayRotationNumber:
 *              type: number
 *          quarters:
 *              type: array
 *          innings:
 *              type: array
 *          currentHitter:
 *              type: string
 *          currentPitcher:
 *              type: string
 *          inningDescription:
 *              type: string
 *          outs:
 *              type: number
 *          balls:
 *              type: number
 *          strikes:
 *              type: number
 */
