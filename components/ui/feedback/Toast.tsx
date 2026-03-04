import { useEffect } from "react";

export enum ToastState {
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
}

interface ToastProps {
    text: string;
    state: ToastState;
    onClose: () => void
    duration?: number;
}

const Toast: React.FC<ToastProps> = ({ text, state, onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    const getBackground = () => {
        switch (state) {
            case ToastState.SUCCESS:
                return "bg-green-500 text-white";
            case ToastState.ERROR:
                return "bg-red-500 text-white";
        }
    };

    return (
        <div className={`fixed bottom-5 z-50 right-5 px-4 py-2 rounded shadow-md ${getBackground()}`}>
            {text}
        </div>
    );
};

export default Toast;