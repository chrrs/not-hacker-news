import { useState } from 'react';
import Field from '../components/Field';

let nextId = 0;

const TextArea: React.FC<{
    label?: string;
    placeholder?: string;
    error?: string;
}> = (props) => {
    const [id] = useState(`textarea-${nextId++}`);

    return (
        <Field id={id} label={props.label} error={props.error}>
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
        </Field>
    );
};

export default TextArea;
