import logoAsset from "@/assets/ptah-logo.png.asset.json";

export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="PTAH Tattoo Logo"
      className={`${className} object-contain mix-blend-screen`}
      loading="eager"
    />
  );
}
