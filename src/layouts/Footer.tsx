import * as React from 'react';

const Footer = () => {
  const currentYear = React.useMemo(() => new Date().getUTCFullYear(), []);

  return (
    <footer className="p-2 flex flex-col justify-center items-center">
      <ul className="flex gap-2 items-center">
        <li>
          <Link href="https://www.github.com/calvo-jp">Github</Link>
        </li>
        <li className="w-1 h-1 rounded-full bg-gray-400" />
        <li>
          <Link href="https://www.twitter.com/calvo__jp">Twitter</Link>
        </li>
        <li className="w-1 h-1 rounded-full bg-gray-400" />
        <li>
          <Link href="https://www.facebook.com/calvojp">Facebook</Link>
        </li>
      </ul>

      <div className="text-sm">&copy; juanonweb {currentYear}</div>
    </footer>
  );
};

interface LinkProps {
  href: string;
}

const Link: React.FC<LinkProps> = ({ href, children }) => {
  return (
    <a target="_blank" rel="noreferrer" href={href}>
      {children}
    </a>
  );
};

export default Footer;
