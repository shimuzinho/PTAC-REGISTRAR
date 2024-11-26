import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import style from '../../assets/styles/registro.module.css';

export default function Registrar() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const registrarPessoa = async (pessoaNova) => {
    try {
      await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pessoaNova)
      });
      reset();
      alert('Registro realizado');
      navigate('/')
    } catch (err) {
      console.error(err);
      alert('Ocorreu um erro no registro');
    }
  };
  

  return (
    <>
      <form onSubmit={handleSubmit(registrarPessoa)} className={style.form}>
      <label htmlFor="nome" className={style.label}>Nome:</label>
      <input 
        type="text" 
        {...register('nome')} 
        name="nome" 
        className={style.input} 
      />
      <label htmlFor="email" className={style.label}>E-mail:</label>
      <input 
        type="email" 
        {...register('email')} 
        name="email" 
        className={style.input} 
      />
      <button className={style.button}>Registrar</button>
    </form>
    </>      
  );
};