import React from "react";
import { Header } from "../../head_components/header";
import { SectionWhyUs } from "./sectionWhyUs";
import { SectionPlans } from "./sectionPlans";

export function Main({ userIsAuthorized }) {
  return (
    <>
      <Header userIsAuthorized={userIsAuthorized} />
      <main>
        <SectionWhyUs />
        <SectionPlans userIsAuthorized={userIsAuthorized} />
      </main>
    </>
  );
}
