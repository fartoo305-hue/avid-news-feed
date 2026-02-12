export function AdPlaceholder({ position = "sidebar" }: { position?: "header" | "sidebar" | "inline" }) {
  const sizes: Record<string, string> = {
    header: "h-24 w-full",
    sidebar: "h-64 w-full",
    inline: "h-28 w-full my-6",
  };

  return (
    <div
      className={`${sizes[position]} flex items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 text-xs text-muted-foreground font-body`}
    >
      <span>مساحة إعلانية — Google AdSense</span>
    </div>
  );
}
