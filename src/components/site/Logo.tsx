import logoAsset from "@/assets/ptah-wordmark.png.asset.json";

export function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="PTAH Tattoo Logo"
      className={`${className} w-auto max-w-full object-contain object-left`}
      loading="eager"
    />
  );
}
