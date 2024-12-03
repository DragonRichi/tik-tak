import { prisma } from "@/shared/lib/db";
import { Field, GameEntity, GameIdleEntity, GameinProgressEntity, GameOverDrawEntity, GameOverEntity } from "../domain";
import { Game, Prisma, User } from "@prisma/client";
import { z } from "zod";

const fieldSchema = z.array(z.union([z.string(), z.null()]))

function dbGameToGame(game: Game &
{
    players: User[]
}
): GameEntity {
    switch (game.status) {
        case "idle": {
            return {
                id: game.id,
                players: game.players,
                status: game.status,
            } satisfies GameIdleEntity
        }
        case "inProgress": {
            return {
                id: game.id,
                players: game.players,
                status: game.status,
                field: fieldSchema.parse(game.field)
            } satisfies GameinProgressEntity
        }
        case "gameOver": {
            return {
                id: game.id,
                players: game.players,
                status: game.status,
            } satisfies GameOverEntity
        }
        case "gameOverDraw": {
            return {
                id: game.id,
                players: game.players,
                status: game.status,
            } satisfies GameOverDrawEntity
        }
    }
}

async function gamesList(): Promise<GameEntity[]> {
    const games = await prisma.game.findMany({
        include: {
            winner: true,
            players: true,
        }
    })
    return games.map(dbGameToGame)
}

export const gameRepository = { gamesList };
