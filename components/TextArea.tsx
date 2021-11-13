import { useState } from 'react';

let nextId = 0;

const Input: React.FC<{
    label?: string;
    placeholder?: string;
    error?: string;
}> = (props) => {
    const [id] = useState(`input-${nextId++}`);

    return (
        <div>
            {props.label && (
                <label
                    htmlFor={id}
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
            <div
                className={`flex w-full rounded border-2 ${
                    props.error
                        ? 'bg-red-50 border-red-400 focus-within:border-red-500'
                        : 'bg-white border-gray-300 focus-within:border-blue-300'
                }`}
            >
                <textarea
                    id={id}
                    rows={5}
                    className="flex-grow py-2 px-4 focus:outline-none bg-transparent min-h-18"
                    placeholder={props.placeholder}
                />
            </div>
        </div>
    );
};

export default Input;
