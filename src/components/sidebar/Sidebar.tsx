import Image from "next/image";
import {
  IoBrowsersOutline,
  IoHeartOutline,
  IoLogoReact,
  IoMapOutline,
} from "react-icons/io5";
import { SidebarMenuItem } from "./SidebarMenuItem";

const menuItems = [
  {
    path: "/dashboard/home",
    icon: <IoBrowsersOutline size={40} />,
    title: "Dashboard",
    subTitle: "Visualización",
  },
  {
    path: "/dashboard/favorites",
    icon: <IoHeartOutline size={40} />,
    title: "Favorites",
    subTitle: "Global State",
  },
  {
    path: "/dashboard/map",
    icon: <IoMapOutline size={40} />,
    title: "Mapa",
    subTitle: "Mapa de Colombia",
  },
];

export const Sidebar = () => {
  return (
    <div
      id="menu"
      style={{ width: "400px" }}
      className="bg-gray-900 min-h-screen z-10 text-slate-300 w-64 left-0 overflow-y-scroll"
    >
      <div id="logo" className="my-4 px-6">
        <h1 className="flex items-center text-lg md:text-2xl font-bold text-white">
          <IoLogoReact className="mr-2" />
          <span>Denil</span>
          <span className="text-green-500">pv</span>.
        </h1>
      </div>

      <div id="profile" className="px-6 py-10">
        <p className="text-slate-500">Bienvenido,</p>
        <a href="#" className="inline-flex space-x-2 items-center">
          <span>
            <Image
              className="rounded-full w-8 h-8"
              src="https://scontent.fsmr2-1.fna.fbcdn.net/v/t39.30808-6/433123875_2742844079209721_3234747098011506404_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=bdeb5f&_nc_eui2=AeEqsZHfvidBjOSNBBcaWp5lYk-oSmYLPnhiT6hKZgs-eH8bIbHtDubhGrctYbiPZHnMuWZhmxlrbH89CoccFtxe&_nc_ohc=2MdAd_wU42cQ7kNvgGbGwlY&_nc_zt=23&_nc_ht=scontent.fsmr2-1.fna&_nc_gid=A30ifJJSpw8nMeMTxUk7l2c&oh=00_AYBQB_NjU-gWpwQVNbqUYBednSFQu2c_q44SSZtdU-jdPg&oe=674B199A"
              alt="Foto de perfil"
              priority
              width={50}
              height={50}
            />
          </span>
          <span className="text-sm md:text-base font-bold">
            Denilson Prescott
          </span>
        </a>
      </div>

      <div id="nav" className="w-full px-6">
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.path} {...item} />
        ))}
      </div>
    </div>
  );
};
