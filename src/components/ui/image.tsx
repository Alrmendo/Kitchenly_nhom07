import React from "react";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(({ className = "", src, alt, width, height, fill = false, ...props }, ref) => {
  const classes = [fill ? "absolute inset-0 w-full h-full" : "", className].join(" ");

  return <img ref={ref} src={src} alt={alt} width={width} height={height} className={classes} {...props} />;
});

Image.displayName = "Image";
