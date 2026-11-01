import Image from "next/image";
import type { Project } from "@/content/projects";

// Print real de um projeto dentro de uma moldura: janela de navegador ou celular.
export default function ProjectShot({ shot }: { shot: NonNullable<Project["shot"]> }) {
  if (shot.frame === "phone") {
    return (
      <div className="w-[min(260px,62vw)] rounded-[40px] bg-[#0c1324] p-2.5">
        <div className="overflow-hidden rounded-[31px]">
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            sizes="260px"
            className="block h-auto w-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[640px] overflow-hidden rounded-[14px] bg-[#fbfcff]">
      <div className="flex items-center gap-1.5 bg-[#e2e8f3] px-4 py-2.5" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
      </div>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes="(min-width: 1024px) 640px, 92vw"
        className="block h-auto w-full"
      />
    </div>
  );
}
