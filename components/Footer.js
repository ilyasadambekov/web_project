import Button from "@/components/Button";
import styles from 'styles/Footer.module.scss'

export default function Footer() {
    return (
        <div className={styles.wrapper}>
            <section>
                <div>
                    <h1>Shop the latest styles</h1>
                    <Button/>
                </div>
                <div/>
            </section>
        </div>
    )
}