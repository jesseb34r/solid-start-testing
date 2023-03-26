import { For } from "solid-js";
import { HoverCard } from "~/components/hover-card";

export type Card = {
  name: string;
  color: "W" | "U" | "B" | "R" | "G";
  imageUrl: string;
};

const mockCards: Card[] = [
  {
    name: "Lightning Bolt",
    color: "R",
    imageUrl: "https://cards.scryfall.io/large/front/f/2/f29ba16f-c8fb-42fe-aabf-87089cb214a7.jpg?1673147852",
  },
  {
    name: "Birds of Paradise",
    color: "G",
    imageUrl: "https://cards.scryfall.io/large/front/f/d/fdfeeb64-0f86-45e9-97e3-dcec72683164.jpg?1599358784",
  },
];

export default function CardsPage() {
  return (
    <main class="flex flex-col items-center justify-center">
      <div class="p-5 ring ring-white">
        <For each={mockCards}>{(card) => <HoverCard card={card} />}</For>
      </div>
    </main>
  );
}
