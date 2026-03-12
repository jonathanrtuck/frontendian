import { redirect, RedirectType } from "next/navigation";
import { type FunctionComponent } from "react";

const Page: FunctionComponent = () =>
  redirect("/blog/os", RedirectType.replace);

export default Page;
