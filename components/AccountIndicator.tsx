import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const AccountIndicator: React.FC = () => {
    const { status, data: session } = useSession();
    const [open, setOpen] = useState(false);
    const dropdown = useRef(null);

    function handleClick(e: MouseEvent) {
        // @ts-ignore
        if (!e.target.closest(`#${dropdown.current?.id}`) && open) {
            setOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    });

    if (status == 'loading') {
        return <div></div>;
    } else if (session) {
        return (
            <div className="flex items-center relative">
                <button
                    className={`header-link ${open ? ' bg-gray-100' : ''}`}
                    onClick={() => setOpen((open) => !open)}
                >
                    <span className="mr-2">{session.user.name}</span>
                    <Image
                        width={12}
                        height={12}
                        src="/icons/chevron-down.svg"
                        alt="Expand Menu Icon"
                    />
                </button>

                {open && (
                    <div
                        ref={dropdown}
                        id="dropdown"
                        className="flex flex-col items-stretch gap-2 absolute top-10 right-0 bg-white p-2 w-36"
                    >
                        <Link href="/" passHref>
                            <a className="header-link">Profile</a>
                        </Link>
                        <hr />
                        <Link href="/" passHref>
                            <a className="header-link">Settings</a>
                        </Link>
                        <button
                            className="header-link text-left"
                            onClick={() => signOut()}
                        >
                            Log out
                        </button>
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <div className="flex items-center">
                <Link href="/login" passHref>
                    <a className="header-link">Login</a>
                </Link>
            </div>
        );
    }
};

export default AccountIndicator;
