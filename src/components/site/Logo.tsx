import logoAsset from "@/assets/ptah-logo.png.asset.json";

export function Logo({
  className = "h-9 w-9",
  blend = true,
}: {
  className?: string;
  blend?: boolean;
}) {
  return (
    <img
      src={logoAsset.url}
      alt="PTAH Tattoo Logo"
      className={`${className} object-contain ${blend ? "mix-blend-screen" : ""}`}
      loading="eager"
    />
  );
}
