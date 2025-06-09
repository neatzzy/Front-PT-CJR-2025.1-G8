import Image from "next/image";
import FormBox from "./components/formulario/loginBox";
import Link from "next/link";

//development 
//PAGINA INICIAL/LOGIN
export default function Home() {
  return (
    <main style={{
      backgroundColor: 'black', 
      margin: '0px',
      padding: '0px',
      boxSizing: 'border-box',
      height: '100vh',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'}}>
      <div style={{ width: '50%', height: '100%', position: 'relative' }}>
        <Image
          src="/image/usuarioImagePage.png"
          alt="alunos"
          fill
          style={{ objectFit: 'cover' }} // ou 'contain', dependendo do efeito desejado
        />
      </div>

      <FormBox /> 
    </main>
  );
}
 

/*<h1>Hello</h1>
      <Link href={"/usuario"}>Novo user</Link> */