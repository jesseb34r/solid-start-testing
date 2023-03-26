import { createSignal, For, JSX, Show } from "solid-js";
import { Portal } from "solid-js/web";

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
