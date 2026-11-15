/** Avatar de Mati: ilustración de Maty Mochilera. `crop` muestra solo la carita (redonda). */
export function MatiAvatar({
  size = 64,
  className = "",
  crop = false,
}: {
  size?: number;
  className?: string;
  crop?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={crop ? "/mati-face.jpg" : "/mati-full.png"}
      alt="Mati"
      width={size}
      height={size}
      style={
        crop
          ? {
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "50% 18%",
              border: "2px solid #E6007E",
              background: "#3a0a30",
            }
          : { objectFit: "contain" }
      }
    />
  );
}
