import FacebookIcon from '../widgets/icons/facebook';
import GithubIcon from '../widgets/icons/github';
import MessengerIcon from '../widgets/icons/messenger';
import StackoverflowIcon from '../widgets/icons/stackoverflow';
import TwitterIcon from '../widgets/icons/twitter';
import WhatsappIcon from '../widgets/icons/whatsapp';

const Footer = () => {
  const items: [JSX.Element, string][] = [
    [<FacebookIcon />, 'https://www.facebook.com/calvojp'],
    [<MessengerIcon />, 'https://m.me/calvojp'],
    [<TwitterIcon />, 'https://www.twitter.com/calvo__jp'],
    [<WhatsappIcon />, 'https://wa.me/639567416960'],
    [<GithubIcon />, 'https://www.github.com/calvo-jp'],
    [<StackoverflowIcon />, 'https://www.stackoverflow.com/calvojp'],
  ];

  return (
    <footer className="p-4 flex flex-col items-center justify-center gap-2">
      <ul className="flex gap-2">
        {items.map((item) => (
          <li key={item[1]}>
            <a
              href="https://www.facebook.com/calvojp"
              target="_blank"
              rel="noreferrer"
            >
              {item[0]}
            </a>
          </li>
        ))}
      </ul>

      <div className="text-md">&copy; JP Calvo {currentYear}</div>
    </footer>
  );
};

const currentYear = new Date().getUTCFullYear();

export default Footer;
