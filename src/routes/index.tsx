import { MyTooltip } from "~/components/MyTooltip";

export default function Home() {
  return (
    <main class="flex flex-col items-center justify-center">
      <MyTooltip triggerContent={"Hover Me"}>Content</MyTooltip>
    </main>
  );
}
