import './App.css';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <>
      <main>
        <h1 className="container">React Summary 5</h1>

        <section>
          <div className="container">
            <h2>Задача 1: Асинхронная проверка при регистрации</h2>
            <RegistrationForm />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
