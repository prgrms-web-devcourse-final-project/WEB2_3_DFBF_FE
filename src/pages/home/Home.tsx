
import { twMerge } from "tailwind-merge";

function Home() {
  return (
    <div>
      <h1 className={twMerge("text-3xl font-bold underline")}>Hello world!</h1>
    </div>
  );
}

export default Home;
