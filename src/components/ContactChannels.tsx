import type { ReactNode } from "react";

const WHATSAPP_URL = "https://wa.me/5563992502093";

const ITEM =
  "inline-flex items-center gap-2.5 border-2 border-ink px-4 py-2.5 font-mono text-sm shadow-[4px_4px_0_var(--foreground)] transition duration-300 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none";

const ICON = "h-4 w-4 shrink-0";

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className={ICON} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="0.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className={ICON} fill="currentColor" aria-hidden="true">
      <path d="M5.2 8.1H2.7V21h2.5V8.1ZM3.95 3A1.47 1.47 0 1 0 3.95 5.94 1.47 1.47 0 0 0 3.95 3ZM21.3 13.6c0-3.88-2.07-5.69-4.83-5.69-2.23 0-3.23 1.23-3.79 2.09V8.1h-2.5V21h2.5v-6.39c0-1.68.32-3.3 2.4-3.3 2.05 0 2.08 1.91 2.08 3.41V21h2.5v-7.4Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className={ICON} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

type ChannelProps = {
  href: string;
  label: string;
  icon: ReactNode;
  external?: boolean;
};

function Channel({ href, label, icon, external = false }: ChannelProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`${ITEM} bg-background text-foreground hover:bg-sage`}
    >
      {icon}
      <span className="truncate">{label}</span>
      <span aria-hidden>↗</span>
    </a>
  );
}

export function ContactChannels({ email, linkedin }: { email: string; linkedin: string }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Channel href={email} label={email.replace(/^mailto:/, "")} icon={<EmailIcon />} />
      <Channel href={linkedin} label="LinkedIn" icon={<LinkedInIcon />} external />
      <Channel href={WHATSAPP_URL} label="WhatsApp" icon={<WhatsAppIcon />} external />
    </div>
  );
}
