const TextArea: React.FC<{
    id: string;
    label?: string;
    error?: string;
}> = ({ children, ...props }) => {
    return (
        <div>
            {props.label && (
                <label
                    htmlFor={props.id}
                    className="flex justify-between items-center inline-block font-semibold text-sm text-gray-600 mb-2"
                >
                    {props.label}
                    {props.error && (
                        <span className="text-xs text-red-500">
                            {props.error}
                        </span>
                    )}
                </label>
            )}
            {children}
        </div>
    );
};

export default TextArea;
