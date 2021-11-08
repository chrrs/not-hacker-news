import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <div className="bg-white p-2">
            <div className="flex justify-between max-w-5xl mx-auto">
                <div className="flex items-center">
                    <Link href="/" passHref>
                        <a className="flex items-center gap-2 mr-2">
                            <span className="inline-block bg-orange-500 w-8 h-8 text-white" />
                            <span className="font-semibold">
                                <span className="border-b-2 border-black">
                                    Not
                                </span>{' '}
                                Hacker News
                            </span>
                        </a>
                    </Link>
                    <Link href="/" passHref>
                        <a className="header-link">New</a>
                    </Link>
                    <Link href="/" passHref>
                        <a className="header-link">Past</a>
                    </Link>
                    <Link href="/" passHref>
                        <a className="header-link">Comments</a>
                    </Link>
                    <Link href="/" passHref>
                        <a className="header-link">Ask</a>
                    </Link>
                    <Link href="/" passHref>
                        <a className="header-link">Show</a>
                    </Link>
                    <Link href="/" passHref>
                        <a className="header-link">Jobs</a>
                    </Link>
                </div>
                <Link href="/login" passHref>
                    <a className="header-link">Log in</a>
                </Link>
            </div>
        </div>
    );
};

export default Header;
