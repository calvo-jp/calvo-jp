import FacebookIcon from "../components/widgets/icons/Facebook";
import GithubIcon from "../components/widgets/icons/Github";
import MessengerIcon from "../components/widgets/icons/Messenger";
import TwitterIcon from "../components/widgets/icons/Twitter";

const useSocials = (): [
  icon: React.FC<React.ComponentProps<"svg">>,
  url: string
][] => {
  return [
    [FacebookIcon, "https://facebook.com/calvojp"],
    [MessengerIcon, "https://m.me/calvojp"],
    [TwitterIcon, "https://twitter.com/calvo__jp"],
    [GithubIcon, "https://github.com/calvo-jp"],
  ];
};

export default useSocials;
