import Logos from "../components/Logos"

export default function AuthLayout({children}){
    return(
        <>
        <Logos/>
            <section>
                {children}
            </section>
        </>
    )
}