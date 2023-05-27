import { useLocation } from "react-router-dom";
import AccountIcon from "../../assets/icon-account.svg";
import Logo from "../../assets/logo-white.svg";
import { routerList } from "../../lib/router/routerList";

export default function Header() {
  const location = useLocation();

  const pageName = routerList.filter((router) => {
    return (
      location.pathname.includes(router.path) ||
      router.path === location.pathname
    );
  })[0].name;

  return (
    <header className="flex justify-between bg-emerald-900 px-4 py-3 text-white">
      <div className="flex gap-4">
        <a href="/">
          <img src={Logo} alt="Logo" width={276.5} height={32} />
        </a>
        <p className="rounded border border-white px-3 py-1 font-medium">
          {pageName}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <img src={AccountIcon} alt="Logo" width={32} height={32} />
        <p>因幡深雪</p>
      </div>
    </header>
  );
}
