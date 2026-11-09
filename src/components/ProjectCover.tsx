import { useId } from "react";

const LEAF_PATH = "M 4 24 C 4 14, 10 5, 23 3 C 25 14, 19 23, 4 24 Z";

type ProjectCoverProps = {
  /** Classes do container pai (define a proporção, ex.: aspect-[16/9]). */
  className?: string;
};

/**
 * Capa padrão para projetos sem screenshot: fundo sage, malha de pontos e
 * folhas no mesmo vocabulário visual do resto do site. Usa as tokens do tema,
 * então funciona no claro e no escuro sem arquivo de imagem.
 */
export function ProjectCover({ className = "" }: ProjectCoverProps) {
  const id = useId().replace(/:/g, "");

  return (
    <div className={`relative overflow-hidden bg-sage ${className}`}>
      <svg
        viewBox="0 0 320 180"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <pattern id={`cover-grid-${id}`} width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="var(--foreground)" opacity="0.14" />
          </pattern>
        </defs>

        <rect width="320" height="180" fill={`url(#cover-grid-${id})`} />

        <path
          d={LEAF_PATH}
          transform="translate(214 34) rotate(16) scale(2.6)"
          fill="var(--signal)"
          fillOpacity="0.4"
        />
        <path
          d={LEAF_PATH}
          transform="translate(38 104) rotate(-26) scale(1.6)"
          fill="var(--accent)"
          fillOpacity="0.32"
        />
        <path
          d={LEAF_PATH}
          transform="translate(150 128) rotate(38) scale(1.1)"
          fill="var(--signal)"
          fillOpacity="0.28"
        />

        <g fill="var(--signal)" opacity="0.85">
          <text x="64" y="52" fontSize="14" textAnchor="middle">✳</text>
          <text x="268" y="140" fontSize="10" textAnchor="middle">✳</text>
          <text x="188" y="86" fontSize="8" textAnchor="middle">✳</text>
        </g>
      </svg>
    </div>
  );
}
