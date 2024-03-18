import Link from "next/link";
import ConnectButton from "./ConnectButton";
import { useSession } from "next-auth/react";


const LoginMenu = (props) => {
    const { data } = useSession();
    return (
        <div className="right-widget d-flex align-items-center ms-auto ms-lg-0 order-lg-3">
            {data?.user ? null :
                (
                <Link
                    href="/login"
                    className={`${props.isWhite? 'login-btn-five' : 'login-btn-two'} fw-500 d-flex align-items-center me-3 me-xl-5`}
                >
                    <i className="bi bi-lock" />
                    <span>login</span>
                </Link>)}


            <ConnectButton isWhite={props.isWhite} />
        </div>
    )
}

export default LoginMenu;