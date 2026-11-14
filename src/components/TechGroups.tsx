import type { SkillGroup } from "@/content/types";
import { localize } from "@/lib/localize";
import { TechTag } from "./ui/TechTag";

export function TechGroups({
  groups,
  locale,
  compact = false,
  className,
}: {
  groups: SkillGroup[];
  locale: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={`${compact ? "space-y-3" : "space-y-5"}${className ? ` ${className}` : ""}`}>
      {groups.map((group) => (
        <div key={group.category.en}>
          <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-signal uppercase">
            {localize(group.category, locale)}
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {group.items.map((item) => (
              <li key={item}>
                <TechTag name={item} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
