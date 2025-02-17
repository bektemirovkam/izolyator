"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { EmailIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import clsx from "clsx";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Contacts } from "@/types/contacts";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";

interface NavbarProps {
  contacts: Contacts;
}

export const nonCatalogRoutes = [
  "/search",
  "/faq",
  "/delivery",
  "/about",
  "/contacts",
];

export const Navbar = ({ contacts }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div>
      <p className="hidden xl:block text-center text-sm bg-amber-500 text-black p-2 rounded-b-lg">
        В данный момент на сайте представлена не вся поставляемая компанией
        продукция, так как сайт находится в стадии наполнения контентом. Для
        уточнения актуальной информации по товарам, обращаться по телефону{" "}
        <Link
          className="text-sm text-black underline"
          href={`tel:${contacts.attributes.phone}`}
        >
          {formatPhoneNumber(contacts.attributes.phone)}
        </Link>
        , или смотреть раздел контакты, где указаны номера менеджеров по
        продажам. Спасибо за понимание!
      </p>
      <NextUINavbar
        maxWidth="xl"
        classNames={{
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:-bottom-2",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[2px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-brand-color",
          ],
          wrapper: ["p-0 border-b-2 max-w-none"],
        }}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="basis-1/5 sm:basis-full">
          <NavbarBrand as="li" className="basis-60 xl:basis-80 flex-grow-0 justify-end">
            <Link className="flex justify-start items-center gap-1" href="/">
              <Image
                src="/logo.png"
                alt="Промоставки"
                width={290}
                height={40}
              />
            </Link>
          </NavbarBrand>
          <ul className="flex flex-auto justify-between ml-5 xl:ml-0">
            <ul className="hidden xl:flex gap-4 justify-start ml-2">
              {siteConfig.navItems.map((item) => (
                <NavbarItem
                  key={item.href}
                  isActive={
                    item.href === "/"
                      ? !nonCatalogRoutes.includes(pathname)
                      : pathname.includes(item.href)
                  }
                >
                  <Link
                    className={clsx(
                      "font-bold",
                      linkStyles({ color: "foreground", size: "sm" }),
                      {
                        "text-brand-color":
                          item.href === "/"
                            ? !nonCatalogRoutes.includes(pathname)
                            : pathname.includes(item.href),
                      }
                    )}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </NavbarItem>
              ))}
            </ul>
            <ul className="hidden md:flex justify-start gap-2 ml-2">
              <NavbarItem className="mr-3">
                <Link
                  aria-label="Телефон"
                  href={`tel:${contacts.attributes.phone}`}
                  className="text-foreground text-xs font-bold"
                >
                  <PhoneIcon
                    size={20}
                    fill="rgb(82, 196, 26)"
                    className="mr-2"
                  />
                  <div className="flex flex-col text-center">
                    <span>{formatPhoneNumber(contacts.attributes.phone)}</span>
                    <span>{contacts.attributes.manager}</span>
                  </div>
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link
                  aria-label="Whatsapp"
                  href={`https://wa.me/${contacts.attributes.whatsapp}`}
                  className="text-foreground text-xs font-bold"
                >
                  <WhatsAppIcon
                    size={20}
                    fill="rgb(82, 196, 26)"
                    className="mr-2"
                  />
                  <div className="flex flex-col text-center">
                    <span>
                      {formatPhoneNumber(contacts.attributes.whatsapp)}
                    </span>
                    <span>{contacts.attributes.manager}</span>
                  </div>
                </Link>
              </NavbarItem>
              <NavbarItem className="flex flex-col">
                <Link
                  aria-label="Email"
                  href={`mailto:enzakaz@bk.ru`}
                  className="text-foreground text-xs font-bold"
                >
                  <EmailIcon
                    size={20}
                    fill="rgb(82, 196, 26)"
                    className="mr-2"
                  />
                  <span>enzakaz@bk.ru</span>
                </Link>
                <Link
                  aria-label="Email"
                  href={`mailto:${contacts.attributes.email}`}
                  className="text-foreground text-xs font-bold"
                >
                  <EmailIcon
                    size={20}
                    fill="rgb(82, 196, 26)"
                    className="mr-2"
                  />
                  <span>{contacts.attributes.email}</span>
                </Link>
              </NavbarItem>
            </ul>
          </ul>
        </NavbarContent>

        <ul className="xl:hidden basis-1 pl-4 justify-end flex-grow-0">
          <NavbarMenuToggle className="p-4 border" />
        </ul>

        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color="foreground"
                  href={item.href}
                  size="lg"
                  onClick={closeMenu}
                  className={clsx(
                    "font-bold",
                    "w-full",
                    linkStyles({ color: "foreground" }),
                    {
                      "text-brand-color":
                        item.href === "/"
                          ? !nonCatalogRoutes.includes(pathname)
                          : pathname.includes(item.href),
                    }
                  )}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
            <div className="flex md:hidden flex-col pt-4 mt-4 border-t-1 border-default-200">
              <NavbarMenuItem className="mr-3">
                <Link
                  aria-label="Телефон"
                  href={`tel:${contacts.attributes.phone}`}
                  className="text-foreground text-xs font-bold"
                  onClick={closeMenu}
                >
                  <PhoneIcon
                    size={20}
                    fill="rgb(82, 196, 26)"
                    className="mr-2"
                  />
                  <span>
                    {formatPhoneNumber(contacts.attributes.phone)}{" "}
                    {`  (${contacts.attributes.manager})`}
                  </span>
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  aria-label="Whatsapp"
                  href={`https://wa.me/${contacts.attributes.whatsapp}`}
                  className="text-foreground text-xs font-bold"
                  onClick={closeMenu}
                >
                  <WhatsAppIcon
                    size={20}
                    fill="rgb(82, 196, 26)"
                    className="mr-2"
                  />
                  <span>
                    {formatPhoneNumber(contacts.attributes.whatsapp)}
                    {`  (${contacts.attributes.manager})`}
                  </span>
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  aria-label="Email"
                  href={`mailto:enzakaz@bk.ru`}
                  className="text-foreground text-xs font-bold"
                  onClick={closeMenu}
                >
                  <EmailIcon
                    size={20}
                    fill="rgb(82, 196, 26)"
                    className="mr-2"
                  />
                  <span>enzakaz@bk.ru</span>
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  aria-label="Email"
                  href={`mailto:${contacts.attributes.email}`}
                  className="text-foreground text-xs font-bold"
                  onClick={closeMenu}
                >
                  <EmailIcon
                    size={20}
                    fill="rgb(82, 196, 26)"
                    className="mr-2"
                  />
                  <span>{contacts.attributes.email}</span>
                </Link>
              </NavbarMenuItem>
            </div>
          </div>
        </NavbarMenu>
      </NextUINavbar>
      <p className="block xl:hidden text-center text-sm bg-amber-500 text-black p-2 rounded-b-lg">
        В данный момент сайт находится в стадии разработки, отладки и наполнения
        контентом. Для уточнения актуальной информации по товарам, обращаться по
        телефону{" "}
        <Link
          className="text-sm text-black underline"
          href={`tel:${contacts.attributes.phone}`}
        >
          {formatPhoneNumber(contacts.attributes.phone)}
        </Link>
        , или смотреть раздел контакты, где указаны номера менеджеров по
        продажам. Спасибо за понимание!
      </p>
    </div>
  );
};
