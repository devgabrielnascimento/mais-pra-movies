import githubIcon from "../assets/img/github-icon.png";
import logo from "../assets/img/logo-mais-pra-movies-dark.svg";
import tmdbLogo from "../assets/img/tmdb-logo.svg";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between gap-2 pt-30 sm:pt-40 md:pt-10 w-full  h-full bg-[#070707]  ">
      <div className="flex flex-col gap-2 text-sm order-2 md:order-1">
        <span className="text-gray-500 hidden md:block">Desenvolvido por:</span>
        <a
          href="https://github.com/devgabrielnascimento"
          target="_blank"
          className="flex gap-4 items-center"
        >
          <img src={githubIcon} alt="icone github"/>
          <span className="text-xs text-gray-300">@devgabrielnascimento</span>
        </a>
      </div>

      <div className="flex flex-col gap-2 items-center order-3 md:order-2">
        <img src={logo} alt="logo" className="w-20 hidden md:block" />
        <small className="text-gray-500">
          Copyrights. Todos direitos reservados
        </small>
      </div>

      <div className="flex flex-col gap-2 text-sm order-1 md:order-3">
        <span className="text-gray-500 hidden md:block">API consumida:</span>
        <a
          href="https://developer.themoviedb.org/reference/intro/getting-started"
          target="_blank"
          className="flex gap-4 items-center"
        >
          <img src={tmdbLogo} alt="tmdb logo" className="w-20"/>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
