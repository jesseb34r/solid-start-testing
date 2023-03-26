import { createEffect, createSignal, JSXElement, mergeProps, ParentComponent, Show } from "solid-js";

type MyTooltipProps = {
  triggerContent: string | JSXElement;
  position?: "bottom" | "left" | "top" | "right";
  offset?: number;
};

export const MyTooltip: ParentComponent<MyTooltipProps> = (props) => {
  const _props = mergeProps(
    {
      position: "bottom",
      offset: 200,
    },
    props,
  );

  const [isOpen, setIsOpen] = createSignal(false);
  const openTooltip = () => setIsOpen(true);
  const closeTooltip = () => setIsOpen(false);

  const [triggerHover, setTriggerHover] = createSignal(false);
  const [tooltipHover, setTooltipHover] = createSignal(false);

  createEffect(() => {
    if (!triggerHover() && !tooltipHover()) {
      setTimeout(() => {
        closeTooltip();
      }, 200);
    } else {
      openTooltip();
    }
  });

  return (
    <div class="relative">
      <div
        onMouseOver={() => setTriggerHover(true)}
        onMouseLeave={() => setTriggerHover(false)}
        class="rounded px-1 py-1.5 ring-1 ring-white"
      >
        {_props.triggerContent}
      </div>
      <Show when={isOpen()}>
        <div
          onMouseOver={() => setTooltipHover(true)}
          onMouseLeave={() => setTooltipHover(false)}
          class="absolute rounded p-5 ring-1 ring-white"
          style={{ top: `${props.offset}px` }}
        >
          {_props.children}
        </div>
      </Show>
    </div>
  );
};
