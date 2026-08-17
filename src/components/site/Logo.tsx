import logoAsset from "@/assets/ptah-wordmark.png.asset.json";

export function Logo({ className = "h-8", inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <img
      src={logoAsset.url}
      alt="PTAH Tattoo Logo"
      className={`${className} w-auto object-contain transition-[filter] duration-500 ease-out`}
      style={{ filter: inverted ? "brightness(0) invert(1)" : "none" }}
      loading="eager"
    />
  );
}
