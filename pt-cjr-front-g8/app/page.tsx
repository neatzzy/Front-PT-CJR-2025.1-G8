import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
//development 

export default function Home() {
  return (
    <main>
      <h1>Hello</h1>
      <Link href={"/usuario"}>Novo user</Link>

      <ProductCard />
    </main>

  );
}
