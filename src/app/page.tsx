import { redirect } from "next/navigation";
import type { FunctionComponent } from "react";

const HomePage: FunctionComponent = () => redirect("/beos");

export default HomePage;
