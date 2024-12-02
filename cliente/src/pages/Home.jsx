import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import style from '../../assets/styles/home.module.css'

export default function Home() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  
  const irParaRegistar = () => {
    navigate('/registrar');
  };

  const removerPessoa = async (pessoa) => {
    try {
      await fetch(`http://localhost:3000/usuarios/${pessoa.id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(error);
      alert('Erro na ligação com o servidor');
    }
  }

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
  }, [usuarios])

  return (
    <>
      <table className={style.containerTabela}>
        <thead className={style.cabecaTabela}>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Função</th>
          </tr>
        </thead>
        <tbody className={style.corpoTabela}>
          {usuarios.map((usuario) =>
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td><button className={style.button} onClick={() => removerPessoa(usuario)}>Remover</button></td>
            </tr>
          )}
        </tbody>
      </table>
      <button className={style.button} onClick={irParaRegistar}>Ir para Registar</button>
    </>
  );
}