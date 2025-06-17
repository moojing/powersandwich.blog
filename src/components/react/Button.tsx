import React from "react";

interface ButtonProps {
  href?: string;
  target?: "_blank" | "_self";
  variant?: "outline" | "inverted";
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  href,
  target = "_blank",
  variant = "outline",
  className = "",
  onClick,
  children,
}) => {
  const baseClasses = "px-4 py-2 text-sm transition-colors duration-200 text-center";
  const variantClasses = {
    outline: "border border-white text-white hover:bg-white hover:text-neutral-900",
    inverted: "bg-white text-neutral-900 border border-white hover:bg-neutral-200",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} target={target} className={classes}>
        <div className="flex gap-2 items-center justify-center">{children}</div>
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      <div className="flex gap-2 items-center justify-center">{children}</div>
    </button>
  );
};

export default Button;
