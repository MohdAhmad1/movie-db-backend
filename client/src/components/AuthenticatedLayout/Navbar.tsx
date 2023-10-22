import { useState } from "react";
import classes from "./Navbar.module.css";
import { AppShell } from "@mantine/core";
import { Link } from "react-router-dom";

const navLinks = [
  { link: "/", label: "Movies" },
  { link: "/genres", label: "Genres" },
  { link: "/actors", label: "Actors" },
];

export function Navbar() {
  const [active, setActive] = useState("Movies");

  const links = navLinks.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <AppShell.Navbar className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>
    </AppShell.Navbar>
  );
}
