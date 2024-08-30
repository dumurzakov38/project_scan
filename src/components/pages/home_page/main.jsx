import React from "react";
import { Header } from "../../head_components/header";
import { Section_whyUs } from "./section_whyUs";
import { Section_plans } from "./section_plans";

export function Main({ userIsAuthorized }) {
  return (
    <>
      <Header userIsAuthorized={userIsAuthorized} />
      <main>
        <Section_whyUs />
        <Section_plans userIsAuthorized={userIsAuthorized} />
      </main>
    </>
  );
}
