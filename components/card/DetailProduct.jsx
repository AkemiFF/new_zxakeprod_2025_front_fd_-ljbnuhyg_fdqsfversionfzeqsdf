import addToCart from '@/util/Cart';
import { useRouter } from "next/navigation";
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { InputNumber } from 'primereact/inputnumber';
import { Rating } from 'primereact/rating';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import style from '../../style/components/card/DetailProduct.module.css';
import ViewProduct from '../images/ViewProduct';
import HandcraftModal from '../modal/HandcraftModal';

// Fonction pour formater les critiques en notation lisible
const formatReviews = (count) => {
    if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'k';
    }
    return count;
};

// Fonction pour calculer la note moyenne
const calculateAverageRating = (reviews) => {
    if (reviews) {
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((sum, review) => sum + review.note, 0);
        return (totalRating / reviews.length).toFixed(1);
    } else { return null }

};

export default function DetailProduct(props) {

    const [product, setProduct] = useState(null);
    const [bookingVisible, setBookingVisible] = useState(null);

    const router = useRouter();
    const { id } = router.query;
    const [quantity, setQuantity] = useState(1);
    const toast = useRef(null);

    useEffect(() => {
        if (id) {
            fetch(`${UrlConfig}/api/artisanat/produit/${id}/`)
                .then(response => response.json())
                .then(data => setProduct(data))
                .catch(error => console.error('Error fetching product:', error));
        }
    }, [id]);

    function handleAddToCart() {
        addToCart(product.id, quantity)
            .then(result => {
                if (result === null || result === undefined) {
                    console.error("Failed to add to cart: No result returned.");
                    return;
                }

                console.log("Added to cart:", result);
                toast.current.show({
                    severity: 'success', summary: 'Succès',
                    detail: `${quantity} produit ajouté au panier.`
                });

            })
            .catch(error => {
                console.error("Error adding to cart:", error);
            });
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    const averageRating = calculateAverageRating(product.avis_clients);
    const reviewCount = formatReviews(product.avis_clients.length || 0);

    return (
        <div className={style.container}>
            <span className={style.breadcrumd2}>Handcraft / {product.artisanat.nom} / {product.nom_produit_artisanal}</span>

            <div className={style.left}>
                <div className={style.image_view_container}>
                    <ViewProduct images={product.images} />
                </div>
                <div className={style.legend_image}>
                    {product.specifications.length >= 2 ? (
                        <>
                            <span className={style.legend}>
                                <Image src='/images/artisanat/garantie.svg' alt='Image Garantie' />
                                {product.specifications[0].type_specification}
                            </span>
                            <span className={style.legend}>
                                <Image src='/images/artisanat/hand.svg' alt='Image Hand' />
                                {product.specifications[1].type_specification}
                            </span>
                        </>
                    ) : (
                        <>
                            <span className={style.legend}>
                                <Image src='/images/artisanat/garantie.svg' alt='Image Garantie' />
                                Guarantee for 30 days
                            </span>
                            <span className={style.legend}>
                                <Image src='/images/artisanat/hand.svg' alt='Image Hand' />
                                100% Malagasy home-made
                            </span>
                        </>
                    )}
                </div>

                <div className={style.review_container}>
                    <div className={style.note_container}>
                        <span className={style.note}>{averageRating}</span>
                        <div className={style.detail_note}>
                            <Rating
                                value={averageRating}
                                disabled
                                cancel={false}
                                pt={{
                                    onIcon: () => ({
                                        style: {
                                            "color": "#FFD700"
                                        }
                                    })
                                }}
                            />
                            <span className={style.review_detail}>{reviewCount} reviews</span>
                        </div>
                    </div>

                    <Button className={`${style.btn_reviews} button-primary`} label='See reviews' />

                </div>
            </div>
            <div className={style.right}>
                <div className={style.right_head_container}>
                    <div className={style.right_head_left_container}>
                        <span className={style.breadcrumd}>Handcraft / {product.artisanat.nom} / {product.nom_produit_artisanal}</span>
                        <span className={style.right_head_title}>{product.nom_produit_artisanal}</span>
                        <div className={style.right_head_detail}>
                            <span className={style.storeStyle}>Store : {product.artisanat.nom}</span>
                            <span className={style.storeStyle}>${product.artisanat.localisation_artisanat ? product.artisanat.localisation_artisanat.ville : ""} - ${product.artisanat.localisation_artisanat ? product.artisanat.localisation_artisanat.adresse : ""}</span>
                        </div>
                    </div>
                    <span className={style.price}>${product.prix_artisanat}</span>
                </div>
                <ScrollPanel style={{ height: "245px" }}>
                    <div className={style.description}>
                        {product.description_artisanat}
                    </div>
                </ScrollPanel>
                <div className={style.specification_container}>
                    {/* Specification gauche */}
                    <div className={style.specification_column}>
                        <div className={style.specification_title}>Specification</div>
                        <ul className={style.specification_list}>
                            {product.specifications
                                .filter((_, index) => index % 2 === 0)
                                .map((spec, index) => (
                                    <li key={index} className={style.specification_item}>
                                        {spec.type_specification}
                                    </li>
                                ))}
                        </ul>
                    </div>

                    {/* Specification droite */}
                    <div className={style.specification_column}>
                        <div className={style.specification_title}>Specification</div>
                        <ul className={style.specification_list}>
                            {product.specifications
                                .filter((_, index) => index % 2 !== 0)
                                .map((spec, index) => (
                                    <li key={index} className={style.specification_item}>
                                        {spec.type_specification}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>


                <div className={style.right_bottom_container}>
                    <div className={style.quantity_container}>
                        <span className={style.quantity_label}>Quantity :</span>
                        <InputNumber onChange={(e) => {
                            setQuantity(e.value);
                        }} inputClassName={style.quantity} />
                    </div>
                    <div className={style.button_group}>
                        <Button icon="pi pi-shopping-cart" onClick={handleAddToCart} raised label='Add to cart' className='button-secondary' />
                        <Button icon="pi pi-shopping-bag" onClick={() => setBookingVisible(true)} label='Buy now' className='button-primary' />
                    </div>
                </div>
            </div>
            <HandcraftModal
                id={product.id}
                description={`Achat de ${product.nom_produit_artisanal} à ${product.artisanat.nom}`}
                artisanat={product.artisanat.nom}
                images={product.images > 0 && product.images[0]}
                quantity={quantity}
                visible={bookingVisible}

                onHide={() => setBookingVisible(false)}
            />
            <Toast ref={toast} />
        </div>


    );
}
