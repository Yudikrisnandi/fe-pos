import { Link, useLocation } from 'react-router-dom';
import Overview from '../assets/Overview';
import ShoppingBag from '../assets/ShoppingBag';
import Wallet from '../assets/Wallet';

const menu = [
  { name: 'Menu', icon: Overview, path: '/' },
  { name: 'Product', icon: ShoppingBag, path: '/product' },
  { name: 'Sale', icon: Wallet, path: '/sale' },
]

export default function SideMenu(){
  const location = useLocation();
  return(
    <aside className="py-6 px-10 w-64 border-r border-gray-200">
      <div className="text-2xl text-violet-500 font-bold">KAASIR</div>
      <ul className="flex flex-col gap-y-6 pt-10">
        {menu.map(item => {
          const Icon = item.icon
          const isMenuActive = location.pathname === item.path;
          return(
            <Link to={item.path}>
              <li className={`flex gap-x-4 items-center text-${isMenuActive ? 'violet' : 'grey'}-500 hover:text-indigo-500 group`}>
                <Icon />
                <span className="font-medium">{item.name}</span>
              </li>
            </Link>
          )
        })}
      </ul>
    </aside>
  )
}
