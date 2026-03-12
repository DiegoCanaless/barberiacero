
import { FaDroplet, FaBolt, FaScissors } from "react-icons/fa6";
import CardService from "../ui/molecules/CardService";
import { domine } from "../ui/typography/fonts";

const Service = () => {
    return (
        <section  id="servicios" className="flex flex-col items-center mt-20">
            <p className="text-xs mb-2">EXPERIENCIA PREMIUM</p>
            <h2 className={`text-3xl text-center font-extrabold border-b-3 pb-2 border-foreground mb-5 ${domine.className}`}>NUESTROS <br className="sm:hidden"/> SERVICIOS</h2>

            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-around">
                <CardService icon={<FaScissors/>} title="CORTES" text="Desde el corte clásico con tijera hasta los fades más modernos y degradados. Definimos tu estilo con precisión milimétrica."/>
                <CardService icon={<FaBolt/>} title="AFEITADOS" text="Rituales de afeitado con toalla caliente, perfilado de barba con navaja y tratamientos para el cuidado de la piel."/>
                <CardService icon={<FaDroplet/>} title="COLORES" text="Platinados, camuflaje de canas y tintes de vanguardia. Cambia tu look completo con nuestros expertos coloristas."/>

            </div>
            

        </section>
    )
}

export default Service