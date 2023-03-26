import { MyTooltip } from "~/components/MyTooltip";

export default function Home() {
  return (
    <main class="flex h-full min-h-screen flex-col items-center justify-center bg-gray-800 text-white">
      <MyTooltip triggerContent={"Hover Me"}>Content</MyTooltip>
    </main>
  );
}
