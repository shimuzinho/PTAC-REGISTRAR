import { useForm } from "react-hook-form";

export default function Registrar() {
  const { register, handleSubmit, reset } = useForm();

  const registrarPessoa = async (pessoaNova) => {
    try {
      await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pessoaNova)
      });
      reset();
      alert('Registro realizado');
    } catch (err) {
      console.error(err);
      alert('Ocorreu um erro no registro');
    }
  };
  

  return (
    <>
      <form onSubmit={handleSubmit(registrarPessoa)}>
        <label htmlFor='nome'>Nome:</label>
        <input 
        type='text'
        {...register('nome')}
        name='nome'/>
        <label htmlFor='email'>E-mail:</label>
        <input 
        type='email'
        {...register('email')}
        name='email'/>
        <button>Registrar</button>
      </form>
    </>      
  );
};