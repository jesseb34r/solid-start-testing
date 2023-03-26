import { createEffect, createSignal } from "solid-js";
import { Portal } from "solid-js/web";

const Tooltip = ({ children, content, position = "bottom", offset = 200 }: any) => {
    const [showTooltip, setShowTooltip] = createSignal(false);

    const handleMouseEnter = () => setShowTooltip(true);
    const handleMouseLeave = () => setShowTooltip(false);

    let tooltipPositionClasses = "";
    switch (position) {
        case "top":
            tooltipPositionClasses = "origin-bottom";
            break;
        case "bottom":
            tooltipPositionClasses = "origin-top";
            break;
        case "left":
            tooltipPositionClasses = "origin-right";
            break;
        case "right":
            tooltipPositionClasses = "origin-left";
            break;
        default:
            break;
    }

    const [tooltipPosition, setTooltipPosition] = createSignal({ left: 0, top: 0 });

    createEffect(() => {
        let tooltipRect = document.getElementById("tooltip")?.getBoundingClientRect();
        console.log(tooltipRect);
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

        let newLeft = tooltipPosition().left;
        let newTop = tooltipPosition().top;
        if (tooltipRect) {
            if (tooltipRect.bottom > viewportHeight) {
                newTop = viewportHeight - tooltipRect.height - tooltipRect.top;
            }
            if (tooltipRect.right > viewportWidth) {
                newLeft = viewportWidth - tooltipRect.width - tooltipRect.left;
            }

            if (newLeft !== tooltipPosition().left || newTop !== tooltipPosition().top) {
                setTooltipPosition({ left: newLeft, top: newTop });
            }
        }
    });

    return (
        <div class='relative'>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {children}
            </div>
            {showTooltip() && (
                <div id='tooltip'>
                    <Portal mount={document.getElementById("tooltip") as any}>
                        <div
                            id='tooltiptext'
                            class={`absolute z-10 rounded-lg bg-white py-2 px-3 text-sm text-gray-700 shadow-lg ${tooltipPositionClasses}`}
                            style={{
                                transform: `translate(${position === "right" ? offset + "px" : position === "left" ? -offset + "px" : 0}, ${
                                    position === "bottom" ? offset + "px" : position === "top" ? -offset + "px" : 0
                                }) translate(${tooltipPosition().left}px, ${tooltipPosition().top}px)`,
                            }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {content}
                        </div>
                    </Portal>
                </div>
            )}
        </div>
    );
};

export default Tooltip;