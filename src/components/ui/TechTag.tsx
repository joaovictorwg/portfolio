import { Tag } from "./Tag";
import { TechIcon } from "./TechIcon";

/** Chip de tecnologia com o ícone da ferramenta quando houver. */
export function TechTag({ name }: { name: string }) {
  return (
    <Tag className="gap-1.5">
      <TechIcon name={name} />
      {name}
    </Tag>
  );
}
