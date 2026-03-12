import { FaCalendar, FaGears, FaScissors, FaUserLarge, FaX } from "react-icons/fa6";
import { ToastState } from "../feedback/Toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { turnoSchema } from "@/validations/turnoSchema";
import { useEffect, useState } from "react";
import { UserResponseDTO } from "@/types/entities/user/UserResponseDTO";
import { ServicioResponseDTO } from "@/types/entities/services/ServicioResponseDTO";
import { DatePickerDemo } from "../organisms/DatePicker";

interface TurnoModal {
    onClose: () => void;
    onToast: (text: string, state: ToastState) => void;
}

const TurnoModal = ({ onClose, onToast }: TurnoModal) => {
    const [user, setUser] = useState<UserResponseDTO | null>(null)
    const [barberos, setBarberos] = useState<UserResponseDTO[]>([])
    const [servicio, setServicio] = useState<ServicioResponseDTO[]>([])
    const [diasBarbero, setDiasBarbero] = useState<{ dia: string }[]>([])
    const [horariosDisponibles, sethorariosDisponibles] = useState<string[]>([])

    const mapaDias: Record<string, number> = {
        domingo: 0,
        lunes: 1,
        martes: 2,
        miercoles: 3,
        jueves: 4,
        viernes: 5,
        sabado: 6
    };

    const diasPermitidos = diasBarbero.map(
        h => mapaDias[h.dia]
    )


    useEffect(() => {
        // Informacion del usuario
        const me = async () => {
            try {
                const res = await fetch("http://localhost:3002/auth/me", {
                    credentials: "include"
                });

                const data: UserResponseDTO = await res.json();
                console.log(data)
                setUser(data)
            } catch (error: unknown) {
                console.error(error)
            }
        }

        // Barberos

        const barbers = async () => {
            try {
                const res = await fetch("http://localhost:3002/barberos/", {
                    credentials: "include"
                })

                const data: UserResponseDTO[] = await res.json();
                console.log("BARBEROS ", data)
                setBarberos(data)

            } catch (error: unknown) {
                console.error(error)
            }
        }

        me()
        barbers()
    }, []);


    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div className="relative w-full max-h-[90vh] overflow-y-auto max-w-xl rounded-xl bg-background p-6 shadow-xl text-foreground flex flex-col items-center">
                    <button onClick={onClose} className="absolute top-5 right-5 cursor-pointer text-gray-400 hover:text-gray-600" >
                        <FaX size={18} />
                    </button>
                    <h4 className="text-2xl font-bold  text-center">NUEVO TURNO</h4>

                    <Formik
                        enableReinitialize
                        initialValues={{
                            usuario: user?.name || "",
                            barberID: "",
                            servicioID: "",
                            fecha: null as Date | null,
                            horario: ""
                        }}
                        validationSchema={turnoSchema}
                        onSubmit={async (values) => {
                            console.log("SUBMIT", values)
                            try {

                                if (!values.horario) {
                                    onToast("Selecciona un horario", ToastState.WARNING)
                                    return
                                }

                                const fecha = new Date(values.fecha!)
                                    .toISOString()
                                    .split("T")[0]

                                const res = await fetch("http://localhost:3002/turnos", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    credentials: "include",
                                    body: JSON.stringify({
                                        barberID: Number(values.barberID),
                                        servicioID: Number(values.servicioID),
                                        fecha: fecha,
                                        horario: values.horario
                                    })
                                })

                                const data = await res.json()

                                if (!res.ok) {
                                    throw new Error(data.message)
                                }

                                onToast("Turno reservado correctamente", ToastState.SUCCESS)
                                onClose()
                            } catch (error) {
                                console.error(error)
                                onToast("Error al reservar turno", ToastState.ERROR)
                            }
                        }}
                    >
                        {({ values, setFieldValue }) => {

                            useEffect(() => {

                                if (!values.barberID) return;

                                const fetchServicios = async () => {
                                    try {
                                        const res = await fetch(
                                            `http://localhost:3002/barberos/${values.barberID}/servicios`,
                                            { credentials: "include" }
                                        );

                                        const data: ServicioResponseDTO[] = await res.json();
                                        console.log("SERVICIOS", data);
                                        setServicio(data);
                                    } catch (error: unknown) {
                                        console.error(error);
                                        onToast("Error al traer servicios", ToastState.ERROR)
                                    }
                                };
                                fetchServicios();
                            }, [values.barberID]);


                            useEffect(() => {
                                if (!values.barberID) return

                                const fetchDias = async () => {
                                    try {
                                        const res = await fetch(`http://localhost:3002/barberos/${values.barberID}/horarios`)

                                        const data = await res.json()

                                        console.log("Horarios Barbero", data)

                                        setDiasBarbero(data)

                                    } catch (error: unknown) {
                                        console.error(error)
                                        onToast("Error al traer los dias", ToastState.ERROR)
                                    }
                                }

                                fetchDias()
                            }, [values.barberID])


                            useEffect(() => {
                                if (!values.barberID || !values.fecha) return;

                                const fetchHorarios = async () => {
                                    try {
                                        const fecha = new Date(values.fecha!)
                                            .toISOString()
                                            .split("T")[0]

                                        const res = await fetch(`http://localhost:3002/turnos/horarios-disponibles?barberID=${values.barberID}&fecha=${fecha}`, {
                                            credentials: "include"
                                        })

                                        const data = await res.json()

                                        console.log("HORARIOS DISPONIBLES", data)

                                        sethorariosDisponibles(data)

                                    } catch (error: unknown) {
                                        console.error(error)
                                        onToast("Error al traer los horarios disponibles", ToastState.ERROR)
                                    }
                                }

                                fetchHorarios()
                            }, [values.barberID, values.fecha])


                            return (
                                <Form className="flex flex-col items-center pt-5 gap-6 w-full">

                                    <div className="flex flex-col items-center w-full">
                                        <label className="flex text-base pl-2 gap-3 w-full"><FaUserLarge /> Nombre</label>
                                        <Field className="border border-muted px-2 py-1.5 text-start rounded-xs w-full mt-2 bg-muted" name="usuario" type="text" disabled />
                                    </div>


                                    <div className="flex flex-col items-center w-full gap-4 md:flex-row ">
                                        <div className="flex flex-col items-center w-full">
                                            <label className="flex text-base pl-2 gap-3 w-full"><FaScissors /> Profesional</label>
                                            <Field as="select" className="border border-foreground px-2 py-1.5 text-start rounded-xs w-full mt-2 text-card-foreground bg-card" name="barberID" >
                                                <option className="text-card-foreground bg-card" value="">
                                                    Seleccionar barbero
                                                </option>

                                                {barberos.map((b) => (
                                                    <option
                                                        className="text-card-foreground bg-card"
                                                        key={b.id_cliente}
                                                        value={b.id_cliente}
                                                    >
                                                        {b.name}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>

                                        {/* SELECT DE SERVICIOS */}

                                        <div className="flex flex-col items-center w-full">
                                            <label className="flex text-base pl-2 gap-3 w-full"> <FaGears /> Servicio</label>
                                            <Field as="select" name="servicioID" className="border border-foreground px-2 py-1.5 text-start rounded-xs w-full mt-2 text-card-foreground bg-card" >
                                                <option className="text-card-foreground bg-card" value="">Seleccionar servicio</option>
                                                {servicio.map((s) => (
                                                    <option key={s.id_servicio} value={s.id_servicio} className="text-card-foreground bg-card" >
                                                        {s.nombre} - ${s.precio}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>
                                    </div>

                                    <ErrorMessage name="barberID" component="div" className="text-red-500 text-sm" />
                                    <ErrorMessage name="servicioID" component="div" className="text-red-500 text-sm" />

                                    {/* Fecha */}

                                    <div className="flex flex-col items-center w-full">
                                        <label className="flex text-base pl-2 gap-3 w-full"><FaCalendar /> Fecha</label>

                                        <DatePickerDemo
                                            value={values.fecha ? new Date(values.fecha) : undefined}
                                            allowedDays={diasPermitidos}
                                            onChange={(date: Date | undefined) => {
                                                setFieldValue("fecha", date)
                                            }}
                                        />

                                        <ErrorMessage name="fecha" component="div" className="text-red-500 text-sm" />

                                    </div>




                                    {/* HORARIOS */}

                                    <div className="flex flex-col items-center w-full">
                                        <label className="flex text-base pl-2 gap-3 w-full">
                                            Horarios disponibles
                                        </label>

                                        <div className="grid grid-cols-4 gap-2 w-full mt-2">
                                            {horariosDisponibles.map((hora) => {

                                                const seleccionado = values.horario === hora

                                                return (
                                                    <button type="button" key={hora} className={`text-xs border px-3 py-2 rounded-md transition
                                                        ${seleccionado
                                                            ? "bg-foreground text-background border-foreground"
                                                            : "border-muted text-card-foreground bg-card hover:text-muted-foreground"
                                                        }`}
                                                        onClick={() => setFieldValue("horario", hora)}>{hora}
                                                    </button>
                                                )

                                            })}


                                        </div>
                                        <ErrorMessage
                                            name="horario"
                                            component="div"
                                            className="text-red-500 text-sm mt-2"
                                        />

                                    </div>

                                    <button type="submit" className="bg-foreground text-background w-full py-2 text-lg font-extrabold hover:cursor-pointer">Reservar</button>




                                </Form>
                            )
                        }}


                    </Formik>


                </div>


            </div>
        </>
    )
}

export default TurnoModal