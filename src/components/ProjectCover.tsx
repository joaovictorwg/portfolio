import Image from "next/image";

const COVER_ICON = "/project-management-timeline-icon.svg";

type ProjectCoverProps = {
  /** Classes do container pai (define a proporção, ex.: aspect-[16/9]). */
  className?: string;
};

/**
 * Capa padrão para projetos sem screenshot: bloco off-white do mesmo tamanho
 * que uma foto ocuparia, com o ícone em preto. As cores são fixas de propósito
 * — a capa deve ler como uma imagem, não como superfície do tema.
 */
export function ProjectCover({ className = "" }: ProjectCoverProps) {
  return (
    <div
      className={`overflow-hidden bg-[#f3f0e5] ${className}`}
    >
      <Image
        src={COVER_ICON}
        alt=""
        aria-hidden
        fill
        unoptimized
        className="object-contain p-16"
      />
    </div>
  );
}
