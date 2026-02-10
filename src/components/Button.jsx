import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'left',
    isLoading = false,
    disabled,
    className,
    to,
    onClick,
    type = 'button',
    ...props
}) => {

    const baseStyles = "inline-flex items-center justify-center gap-3 font-sans uppercase tracking-[0.2em] transition-all duration-300 rounded-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-bone !text-black hover:bg-bronze hover:!text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-transparent",
        secondary: "bg-transparent border border-bone text-bone hover:bg-bone hover:text-black",
        ghost: "bg-transparent text-ash hover:text-bone hover:bg-white/5",
        outline: "bg-transparent border border-white/10 text-ash hover:border-bronze hover:text-bronze",
        danger: "bg-red-900/20 border border-red-500/50 text-red-400 hover:bg-red-900/40"
    };

    const sizes = {
        sm: "text-[10px] px-4 py-2",
        md: "text-[11px] px-8 py-3",
        lg: "text-xs px-10 py-4"
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    const content = (
        <>
            {isLoading && <Loader2 size={14} className="animate-spin" />}
            {!isLoading && Icon && iconPosition === 'left' && <Icon size={14} strokeWidth={1} />}
            <span>{children}</span>
            {!isLoading && Icon && iconPosition === 'right' && <Icon size={14} strokeWidth={1} />}
        </>
    );

    const motionProps = {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.95 }
    };

    if (to) {
        return (
            <Link to={to} className={classes} {...props}>
                {/* We can't easily wrap Link in motion without a custom component, 
            so we'll use a span inside or just rely on CSS transition for scale if motion breaks refs.
            Actually, motion.create(Link) works. Let's try standard CSS for Link to avoid Ref issues if strict mode.
            OR: Wrap content.
        */}
                {content}
            </Link>
        );
    }

    return (
        <motion.button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled || isLoading}
            {...motionProps}
            {...props}
        >
            {content}
        </motion.button>
    );
};

export default Button;
