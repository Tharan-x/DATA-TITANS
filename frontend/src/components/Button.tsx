import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
}) => {
  const baseStyle = "h-11 px-5 rounded-xl font-bold text-sm flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm active:scale-95";
  
  const variants = {
    primary: "bg-[#1E3A2B] hover:bg-[#2D5A40] text-white shadow-emerald-900/20",
    secondary: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20",
    gold: "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20",
    outline: "border-2 border-[#1E3A2B] text-[#1E3A2B] hover:bg-[#1E3A2B] hover:text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-red-500/20",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
      ) : null}
      {children}
    </button>
  );
};
