import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import style from '../../assets/styles/registro.module.css';

export default function Registrar() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
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
      navigate('/');
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
        {...register('nome', { required: 'O nome é obrigatório.'})}
        name="nome" 
        className={style.input} 
      />
      {
        errors.nome && <p className={style.error}>{errors.nome.message}</p>
      }
      <label htmlFor="email" className={style.label}>E-mail:</label>
      <input 
        type="email" 
        {...register('email', { required: 'O e-mail é obrigatório.'})} 
        name="email" 
        className={style.input} 
      />
      {
        errors.email && <p className={style.error}>{errors.email.message}</p>
      }
      <button className={style.button}>Registrar</button>
    </form>
    </>      
  );
};