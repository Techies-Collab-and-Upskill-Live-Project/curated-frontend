// components/BeautifulButton.jsx

export default function BeautifulButton({
    children,
    variant = 'default', // 'playlist' for selected, 'default' otherwise
    className = '',
    ...props
}) {
    const baseStyles = `py-2.5 rounded-2xl font-medium shadow-lg transition duration-300 ease-in-out active:scale-95`;

    const variants = {
        playlist: 'bg-[#E2725B] text-white hover:brightness-110',
        default: 'border border-[#89888B] bg-transparent text-[#262323] hover:bg-[#e6d4ca]',
    };

    const appliedStyles = variants[variant] || variants.default;

    return (
        <button
            className={`${baseStyles} ${appliedStyles} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
