import * as React from 'react';

const Footer = () => {
  const currentYear = React.useMemo(() => new Date().getUTCFullYear(), []);

  return (
    <footer className="p-2 flex flex-col justify-center items-center gap-1">
      <ul className="flex gap-2 items-center">
        <li>
          <Link href="https://www.github.com/calvo-jp">GitHub</Link>
        </li>
        <li>
          <Divider />
        </li>
        <li>
          <Link href="https://www.twitter.com/calvo__jp">Twitter</Link>
        </li>
        <li>
          <Divider />
        </li>
        <li>
          <Link href="https://www.facebook.com/calvojp">Facebook</Link>
        </li>
        <li>
          <Divider />
        </li>
        <li>
          <Link href="https://api.whatsapp.com/send?phone=639567416960">
            WhatsApp
          </Link>
        </li>
      </ul>

      <div className="text-sm">&copy; juanonweb {currentYear}</div>
    </footer>
  );
};

const Divider = () => {
  return <div className="w-1 h-1 rounded-full bg-gray-400" />;
};

interface LinkProps {
  href: string;
}

const Link: React.FC<LinkProps> = ({ href, children }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="hover:text-blue-600"
    >
      {children}
    </a>
  );
};

export default Footer;
