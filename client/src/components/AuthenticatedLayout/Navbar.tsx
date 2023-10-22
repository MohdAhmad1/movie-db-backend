import { useState } from "react";
import classes from "./Navbar.module.css";
import { AppShell } from "@mantine/core";

const navLinks = [
  { link: "", label: "Movies" },
  { link: "", label: "Genres" },
  { link: "", label: "Actors" },
];

export function Navbar() {
  const [active, setActive] = useState("Movies");

  const links = navLinks.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <span>{item.label}</span>
    </a>
  ));

  return (
    <AppShell.Navbar className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>
    </AppShell.Navbar>
  );
}
