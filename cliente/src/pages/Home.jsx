import { useEffect, useState } from "react";

export default function Home() {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarUsuario();
  }, [])

  return (
    <table>
     <thead>
      <tr>
        <th>Nome</th>
        <th>E-mail</th>
      </tr>
     </thead>
     <tbody>
      {usuarios.map((usuario) =>
        <tr key={usuario.id}>
          <td>{usuario.nome}</td>
          <td>{usuario.email}</td>
        </tr>
      )}
      </tbody>
    </table>
  );
}