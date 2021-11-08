import { useState } from 'react';

const Message: React.FC<{
    type: 'info' | 'warning' | 'error';
    title: string;
    content: string;
}> = (props) => {
    return (
        <div
            className={`px-4 py-2 border-2 rounded ${(() => {
                switch (props.type) {
                    case 'info':
                        return 'bg-blue-50 border-blue-500 text-blue-500';
                    case 'warning':
                        return 'bg-yellow-50 border-yellow-500 text-yellow-500';
                    case 'error':
                        return 'bg-red-50 border-red-500 text-red-500';
                }
            })()}`}
        >
            <h1 className="font-semibold">{props.title}</h1>
            <p>{props.content}</p>
        </div>
    );
};

export default Message;
