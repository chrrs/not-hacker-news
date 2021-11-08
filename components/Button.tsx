const Button: React.FC<{ type?: string }> = ({ children, ...props }) => {
    return (
        <button
            className={`w-full py-2 font-semibold rounded focus:outline-none transition-colors ${(() => {
                switch (props.type) {
                    case 'primary':
                        return 'text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700';
                    case 'link':
                        return 'text-blue-500 hover:text-blue-600 active:text-blue-700';
                    default:
                        return 'text-gray-600 bg-gray-200 hover:bg-gray-300';
                }
            })()}`}
        >
            {children}
        </button>
    );
};

export default Button;
