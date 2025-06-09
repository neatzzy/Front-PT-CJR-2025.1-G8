import Image from "next/image";
import Link from "next/link";

//development 

export default function Home() {
  return (
    <main>
      <h1>Hello</h1>
      <Link href={"/usuario"}>Novo user</Link>
    </main>

  );
}
