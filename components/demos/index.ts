import type { DemoKind } from "@/content/projects";
import LabDemo from "./LabDemo";
import RoutineDemo from "./RoutineDemo";

// Qual tela animada acompanha cada projeto (campo `demo` em content/projects.ts).
export const demos: Record<DemoKind, () => React.JSX.Element> = {
  lab: LabDemo,
  routine: RoutineDemo,
};
