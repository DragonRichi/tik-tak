import { prisma } from "@/shared/lib/db";
import { Button } from "@/shared/ui/button";
import { Card, CardTitle } from "@/shared/ui/card";

export default async function Home() {
  const games = await prisma.game.findMany();
  return (
    <div>
      <Button size="lg">Hi</Button>
      {games.map((game) => (
        <Card key={game.id}>
          <CardTitle>{game.status}</CardTitle>
        </Card>
      ))}
    </div>
  );
}
