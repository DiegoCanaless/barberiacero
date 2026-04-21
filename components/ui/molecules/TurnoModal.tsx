import { FaCalendar, FaGears, FaScissors, FaUserLarge, FaX } from "react-icons/fa6";
import { ToastState } from "../feedback/Toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { turnoSchema } from "@/validations/turnoSchema";
import { useEffect, useState } from "react";
import { UserResponseDTO } from "@/types/entities/user/UserResponseDTO";
import { ServicioResponseDTO } from "@/types/entities/services/ServicioResponseDTO";
import { DatePickerDemo } from "../organisms/DatePicker";
import { socket } from "@/lib/socket"


interface TurnoModal {
    onClose: () => void;
    onToast: (text: string, state: ToastState) => void;
}

const formatFecha = (date: Date): string => {
    const d = new Date(date)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
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

    const diasPermitidos = [
        ...new Set(diasBarbero.map(h => mapaDias[h.dia]))
    ]


    useEffect(() => {
        const me = async () => {
            try {
                const token = localStorage.getItem("token")

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data: UserResponseDTO = await res.json();
                setUser(data)
            } catch (error: unknown) {
                console.error(error)
            }
        }

        const barbers = async () => {
            try {
                const token = localStorage.getItem("token")

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/getBarbers`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const data: UserResponseDTO[] = await res.json();
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
                    <button onClick={onClose} className="absolute top-5 right-5 cursor-pointer text-gray-400 hover:text-gray-600">
                        <FaX size={18} />
                    </button>
                    <h4 className="text-2xl font-bold text-center">NUEVO TURNO</h4>

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
                            try {
                                const token = localStorage.getItem("token")

                                if (!values.horario) {
                                    onToast("Selecciona un horario", ToastState.WARNING)
                                    return
                                }

                                const fecha = formatFecha(values.fecha!)

                                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/turnos`, {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },

                                    body: JSON.stringify({
                                        barberID: Number(values.barberID),
                                        servicioID: Number(values.servicioID),
                                        fecha,
                                        horario: values.horario
                                    })
                                })

                                const data = await res.json()
                                if (!res.ok) throw new Error(data.message)

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
                                        const token = localStorage.getItem("token")

                                        const res = await fetch(
                                            `${process.env.NEXT_PUBLIC_API_URL}/barberos/${values.barberID}/servicios`,
                                            {
                                                headers: {
                                                    Authorization: `Bearer ${token}`
                                                }
                                            }
                                        );
                                        const data: ServicioResponseDTO[] = await res.json();
                                        setServicio(data);
                                    } catch (error: unknown) {
                                        console.error(error);
                                        onToast("Error al traer servicios", ToastState.ERROR)
                                    }
                                };
                                setFieldValue("servicioID", "")
                                setFieldValue("fecha", null)
                                setFieldValue("horario", "")
                                sethorariosDisponibles([])


                                fetchServicios();
                            }, [values.barberID]);


                            useEffect(() => {
                                if (!values.barberID) return

                                const fetchDias = async () => {
                                    try {
                                        const token = localStorage.getItem("token")

                                        const res = await fetch(
                                            `${process.env.NEXT_PUBLIC_API_URL}/barberos/${values.barberID}/horarios`, {
                                            headers: {
                                                Authorization: `Bearer ${token}`
                                            }
                                        }
                                        )
                                        const data = await res.json()
                                        setDiasBarbero(data)



                                    } catch (error: unknown) {
                                        console.error(error)
                                        onToast("Error al traer los dias", ToastState.ERROR)
                                    }
                                }

                                fetchDias()
                            }, [values.barberID])


                            useEffect(() => {
                                if (!values.barberID || !values.servicioID || !values.fecha) return;

                                const fetchHorarios = async () => {
                                    try {
                                        const token = localStorage.getItem("token")
                                        const fecha = formatFecha(values.fecha!)

                                        const res = await fetch(
                                            `${process.env.NEXT_PUBLIC_API_URL}/turnos/horarios-disponibles?barberID=${values.barberID}&fecha=${fecha}&servicioID=${values.servicioID}`,
                                            {
                                                headers: {
                                                    Authorization: `Bearer ${token}`
                                                }
                                            }
                                        )

                                        const data = await res.json()


                                        sethorariosDisponibles(Array.isArray(data) ? data : [])

                                    } catch (error: unknown) {
                                        console.error(error)
                                        sethorariosDisponibles([])
                                        onToast("Error al traer los horarios disponibles", ToastState.ERROR)
                                    }
                                }

                                setFieldValue("horario", "")
                                fetchHorarios()

                            }, [values.barberID, values.servicioID, values.fecha])

                            // SOCKET ESCUCHANDO HORARIOS

                            useEffect(() => {
                                if (!socket.connected) socket.connect();

                                const handleNuevoTurno = (nuevoTurno: any) => {
                                    if (!values.fecha || !values.barberID) return;

                                    const mismaFecha = formatFecha(values.fecha) === nuevoTurno.fecha;
                                    const mismoBarbero = Number(values.barberID) === nuevoTurno.barbero?.id_usuario;

                                    if (mismaFecha && mismoBarbero) {
                                        const hora = nuevoTurno.horario.slice(0, 5);

                                        sethorariosDisponibles(prev =>
                                            prev.filter(h => h !== hora)
                                        );

                                        if (values.horario === hora) {
                                            setFieldValue("horario", "");
                                        }
                                    }
                                };

                                socket.on("nuevo_turno", handleNuevoTurno);

                                return () => {
                                    socket.off("nuevo_turno", handleNuevoTurno);
                                };
                            }, [values.barberID, values.fecha, values.horario]);





                            return (
                                <Form className="flex flex-col items-center pt-5 gap-6 w-full">

                                    <div className="flex flex-col items-center w-full">
                                        <label className="flex text-base pl-2 gap-3 w-full"><FaUserLarge /> Nombre</label>
                                        <Field className="border border-muted px-2 py-1.5 text-start rounded-xs w-full mt-2 bg-muted" name="usuario" type="text" disabled />
                                    </div>

                                    <div className="flex flex-col items-center w-full gap-4 md:flex-row">
                                        <div className="flex flex-col items-center w-full">
                                            <label className="flex text-base pl-2 gap-3 w-full"><FaScissors /> Profesional</label>
                                            <Field as="select" className="border border-foreground px-2 py-1.5 text-start rounded-xs w-full mt-2 text-card-foreground bg-card" name="barberID">
                                                <option className="text-card-foreground bg-card" value="">Seleccionar barbero</option>
                                                {barberos.map((b) => (
                                                    <option className="text-card-foreground bg-card" key={b.id_usuario} value={b.id_usuario}>
                                                        {b.name}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>

                                        <div className="flex flex-col items-center w-full">
                                            <label className="flex text-base pl-2 gap-3 w-full"><FaGears /> Servicio</label>
                                            <Field as="select" name="servicioID" className="border border-foreground px-2 py-1.5 text-start rounded-xs w-full mt-2 text-card-foreground bg-card">
                                                <option className="text-card-foreground bg-card" value="">Seleccionar servicio</option>
                                                {servicio.map((s) => (
                                                    <option key={s.id_servicio} value={s.id_servicio} className="text-card-foreground bg-card">
                                                        {s.nombre} - ${s.precio}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>
                                    </div>

                                    <ErrorMessage name="barberID" component="div" className="text-red-500 text-sm" />
                                    <ErrorMessage name="servicioID" component="div" className="text-red-500 text-sm" />

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

                                    <div className="flex flex-col items-center w-full">
                                        <label className="flex text-base pl-2 gap-3 w-full">
                                            Horarios disponibles
                                        </label>

                                        {(!values.servicioID || !values.fecha) && (
                                            <p className="text-muted-foreground text-sm mt-2">
                                                Seleccioná un servicio y una fecha para ver los horarios
                                            </p>
                                        )}

                                        {values.servicioID && values.fecha && horariosDisponibles.length === 0 && (
                                            <p className="text-muted-foreground text-sm mt-2">
                                                No hay horarios disponibles para ese día
                                            </p>
                                        )}

                                        <div className="grid grid-cols-4 gap-2 w-full mt-2">
                                            {horariosDisponibles.map((hora) => {
                                                const seleccionado = values.horario === hora
                                                return (
                                                    <button
                                                        type="button"
                                                        key={hora}
                                                        className={`text-xs border px-3 py-2 rounded-md transition
                                                            ${seleccionado
                                                                ? "bg-foreground text-background border-foreground"
                                                                : "border-muted text-card-foreground bg-card hover:text-muted-foreground"
                                                            }`}
                                                        onClick={() => setFieldValue("horario", hora)}
                                                    >
                                                        {hora}
                                                    </button>
                                                )
                                            })}
                                        </div>

                                        <ErrorMessage name="horario" component="div" className="text-red-500 text-sm mt-2" />
                                    </div>

                                    <button type="submit" className="bg-foreground text-background w-full py-2 text-lg font-extrabold hover:cursor-pointer">
                                        Reservar
                                    </button>

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