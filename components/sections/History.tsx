import CardWorker from "../ui/molecules/CardWorker"
import { domine } from "../ui/typography/fonts"

const History = () => {
    return (
        <section  id="nosotros" className="mt-20">
            <div className="container mx-auto px-6 lg:px-15">
                <div className="w-full rounded-lg flex flex-col items-center lg:flex-row lg:items-center lg:gap-16">
                    <img 
                        src="./history.jpg" 
                        alt="Historia" 
                        className="sm:max-w-lg mb-10 rounded-lg h-auto object-contain pl-4 pb-4 border-l-2 border-b-2 border-foreground lg:w-1/2 lg:mb-0" 
                    />
                    <div className="flex flex-col justify-start lg:w-1/2">
                        <p className="text-xs font-bold mb-2">NUESTRA HISTORIA</p>
                        <h3 className={`text-2xl font-bold mb-4 ${domine.className}`}>
                            Más que una barbería,<br/> una experiencia de estilo
                        </h3>
                        <p className="mb-4 text-md text-foreground xl:max-w-2xl">
                            Fundada en 2025, LaCero Barber nació con la misión de reinventar la tradición del barbero clásico y llevarla al hombre contemporáneo. Aquí no solo se trata de un corte de pelo: es un espacio pensado para quienes valoran la precisión, la estética y el cuidado personal como parte de su identidad.
                        </p>
                        <p className="text-xs font-bold mb-4">EL EQUIPO</p>
                        <div className="flex flex-col gap-4">
                            <CardWorker name="Persona 1" description="Fundador & Master Barber" img="./iconUser.png" />
                            <CardWorker name="Persona 2" description="Fundador & Master Barber" img="./iconUser.png" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default History