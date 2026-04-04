import { redirect } from "next/navigation";

export default function Home() {
  // no landing page needed, just go to the editor
  redirect("/create");
}
