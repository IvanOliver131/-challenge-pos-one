import { Logo } from "@/assets";
import { Form } from "./form";
import { MyLinks } from "./my-links";

export default function Home() {
  return (
    <div className="max-w-[1280px] px-2 pt-[88px] flex flex-col m-auto">
      <header className="mb-8">
        <Logo />
      </header>
      <div className="flex flex-col gap-5 md:flex-row">
        <Form />
        <MyLinks />
      </div>
    </div>
  );
}
