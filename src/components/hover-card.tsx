import { HoverCard as KHoverCard } from "@kobalte/core";
import { Component } from "solid-js";
import type { Card } from "~/routes/cards";

export const HoverCard: Component<{ card: Card }> = (props) => {
  return (
    <KHoverCard.Root>
      <KHoverCard.Trigger>{props.card.name}</KHoverCard.Trigger>
      <KHoverCard.Portal>
        <KHoverCard.Content class="bg-contain" style={{ "background-image": `url("${props.card.imageUrl}")` }}>
          <KHoverCard.Arrow />
        </KHoverCard.Content>
      </KHoverCard.Portal>
    </KHoverCard.Root>
  );
};
