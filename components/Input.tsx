import { useState } from 'react';
import Eye from '../public/icons/eye.svg';
import EyeOff from '../public/icons/eye-off.svg';

let nextId = 0;

const Input: React.FC<{
    label?: string;
    type?: 'password';
    placeholder?: string;
    error?: string;
}> = (props) => {
    const [id] = useState(`input-${nextId++}`);
    const [shown, setShown] = useState(false);

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
                <input
                    id={id}
                    type={
                        props.type == 'password' && shown ? 'text' : props.type
                    }
                    className="flex-grow py-2 px-4 focus:outline-none bg-transparent"
                    placeholder={props.placeholder}
                />
                {props.type == 'password' && (
                    <button
                        className="flex items-center justify-center px-4 focus:outline-none text-gray-600"
                        onClick={() => setShown((shown) => !shown)}
                    >
                        {shown ? <EyeOff /> : <Eye />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;
