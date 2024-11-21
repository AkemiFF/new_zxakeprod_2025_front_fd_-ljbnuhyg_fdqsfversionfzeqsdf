import { Button } from "primereact/button";
import style from '@/style/components/button/GoogleButton.module.css'
import { Image } from "primereact/image";
export default function GoogleButton() {
    return (
        <Button className={style.button_container}>
            <Image imageClassName={style.image_google} alt="" src="/images/google.png" />
            <span>Sign with google</span>
        </Button>
    );
}