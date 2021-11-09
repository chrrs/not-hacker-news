import { useEffect, useState } from 'react';
import { Post } from '../lib/types';

const PostComponent: React.FC<{ number: number; post: Post }> = (props) => {
    const [shortUrl, setShortUrl] = useState(undefined as string | undefined);

    useEffect(() => {
        setShortUrl(/^[a-z]+:\/\/(.+?)(?:\/|$)/gi.exec(props.post.url)[1]);
    }, [props.post]);

    return (
        <div className="flex items-center gap-4">
            <p className="w-8 text-right font-semibold">{props.number}.</p>
            <div className="leading-tight">
                <a href={props.post.url}>
                    <span className="text-lg font-semibold">
                        {props.post.title}
                    </span>{' '}
                    {shortUrl && (
                        <span className="text-gray-500">({shortUrl})</span>
                    )}
                </a>
                <p className="text-gray-500">
                    {'by '}
                    <a className="post-link">{'author'}</a> {'4 hours ago'}
                    <span className="text-gray-300"> - </span>
                    <a className="post-link">{0} comments</a>
                    <span className="text-gray-300"> - </span>
                    <a className="post-link hover:(text-yellow-500 border-yellow-300)">
                        save
                    </a>
                    <span className="text-gray-300"> - </span>
                    <a className="post-link hover:(text-red-500 border-red-300)">
                        delete
                    </a>
                </p>
            </div>
        </div>
    );
};

export default PostComponent;
