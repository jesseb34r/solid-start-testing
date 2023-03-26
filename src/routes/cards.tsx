import { createSignal, For, JSX, Show } from "solid-js";
import { Portal } from "solid-js/web";

export type Card = {
  name: string;
  color: "W" | "U" | "B" | "R" | "G";
  imageUrl: string;
};

const mockCards: Card[] = [
  {
    name: "Swords to Plowshares",
    color: "W",
    imageUrl: "https://cards.scryfall.io/normal/front/6/8/68357502-cf23-4bf6-ab4e-371428e540d0.jpg?1669720067",
  },
  {
    name: "Thalia, Guardian of Thraben",
    color: "W",
    imageUrl: "https://cards.scryfall.io/normal/front/8/2/824423ff-6441-4be6-b754-810adf9ca6a2.jpg?1562925761",
  },
  {
    name: "Brainstorm",
    color: "U",
    imageUrl: "https://cards.scryfall.io/large/front/c/6/c6118d1d-28c1-4f54-97cb-c4f934b6739c.jpg?1666553503",
  },
  {
    name: "Snapcaster Mage",
    color: "U",
    imageUrl: "https://cards.scryfall.io/large/front/9/e/9e5b279e-4670-4a1e-87d0-3cab7e4f9e58.jpg?1562834679",
  },
  {
    name: "Thoughtseize",
    color: "B",
    imageUrl: "https://cards.scryfall.io/large/front/9/5/95702503-8f2d-46c8-abdb-6edd6c431d19.jpg?1599711020",
  },
  {
    name: "Dark Confidant",
    color: "B",
    imageUrl: "https://cards.scryfall.io/large/front/9/4/94f7a441-bf2d-46fb-a7b6-9bd6137f86d9.jpg?1598914714",
  },
  {
    name: "Lightning Bolt",
    color: "R",
    imageUrl: "https://cards.scryfall.io/large/front/f/2/f29ba16f-c8fb-42fe-aabf-87089cb214a7.jpg?1673147852",
  },
  {
    name: "Ragavan, Nimble Pilferer",
    color: "R",
    imageUrl: "https://cards.scryfall.io/large/front/a/9/a9738cda-adb1-47fb-9f4c-ecd930228c4d.jpg?1653966896",
  },
  {
    name: "Green Sun's Zenith",
    color: "G",
    imageUrl: "https://cards.scryfall.io/normal/front/0/2/02335747-54e3-4827-ae19-4e362863da9b.jpg?1562609284",
  },
  {
    name: "Birds of Paradise",
    color: "G",
    imageUrl: "https://cards.scryfall.io/large/front/f/d/fdfeeb64-0f86-45e9-97e3-dcec72683164.jpg?1599358784",
  },
];

const colorVariants = {
  W: "bg-[hsl(50,100%,80%,0.2)]",
  U: "bg-[hsl(220,100%,65%,0.2)]",
  B: "bg-[hsl(260,40%,50%,0.2)]",
  R: "bg-[hsl(0,100%,65%,0.2)]",
  G: "bg-[hsl(100,100%,65%,0.2)]",
  M: "bg-[hsl(50,100%,40%,0.2)]",
  C: "bg-[hsl(0,0%,40%,0.2)]",
  L: "bg-[hsl(20,100%,40%,0.2)]",
};

export default function CardsPage() {
  const [hoverCardIsOpen, setHoverCardIsOpen] = createSignal(false);
  const [hoverCardImageUrl, setHoverCardImageUrl] = createSignal<string>();

  const [cursorX, setCursorX] = createSignal(0);
  const [cursorY, setCursorY] = createSignal(0);
  const handlePointerMove: JSX.EventHandlerUnion<HTMLDivElement, PointerEvent> = (e) => {
    if (e.pointerType === "touch") {
      return;
    }

    setCursorX(e.clientX);
    setCursorY(e.clientY);
  };

  return (
    <main class="flex flex-col items-center justify-center">
      <div onPointerMove={handlePointerMove} class="flex flex-col overflow-hidden rounded ring ring-mauve6">
        <For each={mockCards}>
          {(card) => {
            const handlePointerEnter: JSX.EventHandlerUnion<HTMLDivElement, PointerEvent> = (e) => {
              if (e.pointerType === "touch") {
                return;
              }

              setHoverCardImageUrl(card.imageUrl);
              setHoverCardIsOpen(true);
            };

            const handlePointerLeave: JSX.EventHandlerUnion<HTMLDivElement, PointerEvent> = (e) => {
              if (e.pointerType === "touch") {
                return;
              }

              setHoverCardIsOpen(false);
            };

            return (
              <div
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                onPointerMove={handlePointerMove}
                class={`${
                  colorVariants[card.color]
                } relative cursor-pointer p-1.5 hover:after:absolute hover:after:inset-0 hover:after:bg-whiteA4`}
              >
                {card.name}
              </div>
            );
          }}
        </For>
        <Show when={hoverCardIsOpen()}>
          <Portal>
            <div class="absolute z-50 w-[15rem]" style={{ top: `${cursorY() + 5}px`, left: `${cursorX() + 5}px` }}>
              <img src={hoverCardImageUrl()} alt="card image" width="262" height="366" class="w-full rounded-xl" />
            </div>
          </Portal>
        </Show>
      </div>
    </main>
  );
}
