import { useState, useEffect, useRef } from "react";

const ToastDemo = () => {
    var [toast, setToast] = useState(true);
    const toastRef = useRef();

    useEffect(() => {
        const bootstrap = require('bootstrap');

        var myToast = toastRef.current
        var bsToast = bootstrap.Toast.getInstance(myToast)

        if (!bsToast) {
            // initialize Toast
            bsToast = new bootstrap.Toast(myToast, { autohide: false })
        }
        (toast) ? bsToast.show() : bsToast.hide();
        console.log(toast);
    })

    return (
        <div className="toast position-fixed top-0 end-0 m-4" role="alert" ref={toastRef}>
            <div className="toast-header">
                <strong className="me-auto">Bootstrap 5</strong>
                <small>4 mins ago</small>
                <button type="button" className="btn-close" onClick={() => setToast(false)} aria-label="Close"></button>
            </div>
            <div className="toast-body">
                Hello, world! This is a toast message.
            </div>
        </div>
    )
}

export default ToastDemo;