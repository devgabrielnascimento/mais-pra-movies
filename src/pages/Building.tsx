import { Link } from "react-router-dom";
import FilledButton from "../components/FilledButton";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import backdropFallback from "../assets/img/backdrop-fallback.jpg"
import engines from "../assets/img/engines.png"


const Building = () => {
  return (
    <>
    <Menu/>
      <main className="relative h-[calc(100vh-96px)] md:h-[calc(100vh-102px)] flex items-center text-center justify-center bg-[linear-gradient(to_bottom,rgba(103,1,212,0.3),rgba(0,0,0,1))]">
        <img
          src={backdropFallback
          }
          alt="backdrop"
          className="absolute top-0 left-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(to_bottom,rgba(103,1,212,0.5),rgba(0,0,0,1))] bottom-[-1px]"></div>
        <section className="absolute flex flex-col gap-4 items-center text-center justify-center z-50 p-4">
          <img src={engines} alt="engines" className="w-24 md:w-36"/>
          <span className="text-4xl md:text-5xl font-extrabold">Em construção...</span>
          <p className="font-bold">Esta página ainda está sendo desenvolvida...</p>
          <p>Aguarde, pois em breve estará disponível para ser acessada</p>
          <Link to="/">
            <FilledButton
              text="Voltar para o catálogo de filmes"
              bgColor="#6700D4"
            />
          </Link>
        </section>
      </main>
      <Footer/>
    </>
  );
};

export default Building;
