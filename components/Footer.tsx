import { NextPage } from "next";
import React from "react";

const Footer: NextPage = () => {
  const footerList1 = [
    "About",
    "Newsroom",
    "Store",
    "Contact",
    "Carrers",
    "Creator Directory",
  ];
  const footerList2 = [
    "Lensed for Good",
    "Advertise",
    "Developers",
    "Transparency",
    "Lensed Rewards",
  ];
  const footerList3 = [
    "Help",
    "Safety",
    "Terms",
    "Privacy",
    "Creator Portal",
    "Community Guidelines",
  ];

  const List = ({ items, mt }: { items: string[]; mt: Boolean }) => (
    <div className={`flex flex-wrap gap-2 ${mt && "mt-5"}`}>
      {items.map((item: string) => (
        <p
          key={item}
          className='text-gray-400 text-sm  hover:underline cursor-pointer'
        >
          {item}
        </p>
      ))}
    </div>
  );

  return (
    <div className='mt-6 hidden xl:block'>
      <List items={footerList1} mt={false} />
      <List items={footerList2} mt />
      <List items={footerList3} mt />
      <p className='text-gray-400 text-sm mt-5'>© 2022 Lensed</p>
    </div>
  );
};

export default Footer;
