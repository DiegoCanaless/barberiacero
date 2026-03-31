import { domine } from "../ui/typography/fonts"
import { FaPhone, FaLocationDot, FaClock, FaEnvelope, FaInstagram, FaFacebookF, FaSquareXTwitter } from "react-icons/fa6";
import Information from "../ui/organisms/Information";

const Location = () => {

    const seguinos = [
        { key: 1, icon: <FaInstagram />, enlace: "" },
        { key: 2, icon: <FaFacebookF />, enlace: "" },
        { key: 3, icon: <FaSquareXTwitter />, enlace: "" },
    ]

    return (
        <section  id="contacto" className=" flex px-6 mt-15 flex-col pb-8 md:flex-row md:gap-5 md:items-center md:justify-around">
            <div className="flex flex-col">
                <p className="text-xs font-bold mb-2">UBICACION</p>
                <h3 className={`text-2xl font-bold mb-4 ${domine.className}`}>VÍSITANOS</h3>
                <Information icon={<FaLocationDot />} title="DIRECCION" subtitle="Av. Siempre Viva 123." info="Palermo, Buenos Aires" />
                <Information icon={<FaPhone />} title="TELÉFONO" subtitle="+54 9 261 8569911" />
                <Information icon={<FaClock />} title="HORARIOS" subtitle="Lun - Vie: 10:00 - 20:00" info="Sábados: 09:00 - 18:00" day="Domingos Cerrado" />
                <Information icon={<FaEnvelope />} title="EMAIL" subtitle="infobarberia@gmail.com" />
                <p className="text-md font-bold mb-2 mt-5">Siguenos</p>
                <div className="flex gap-5 p-3 mb-5">
                    {seguinos.map((e) => (
                        <a key={e.key} className="transition-colors text-foreground bg-primary/10 p-2 rounded-full cursor-pointer hover:bg-muted-foreground">
                            {e.icon}
                        </a>
                    ))}
                </div>
            </div>
            <div className=" w-full mt-6 md:mt-0 md:w-2/5 h-80 md:h-120 rounded-xl overflow-hidden border border-border shadow-sm ">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d696.5859672210792!2d-68.85918140336068!3d-32.92868756789142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0a2b320a9833%3A0xad6b302a919312b0!2sDr.%20Salvador%20Civit%20557%2C%20M5504CNC%20Godoy%20Cruz%2C%20Mendoza!5e1!3m2!1ses!2sar!4v1769142940222!5m2!1ses!2sar"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </section>
    )
}

export default Location