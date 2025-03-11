import { redirect, RedirectType } from "next/navigation";
import { type FunctionComponent } from "react";

const Page: FunctionComponent = () => redirect("/beos", RedirectType.replace);

export default Page;
