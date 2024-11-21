import { useEffect, useState } from 'react';
import style from './../../style/components/images/ViewProduct.module.css';
import { Image } from 'primereact/image';

export default function ViewProduct(props) {
    const [imageView, setImageView] = useState('');
    const [idImageView, setIdImageView] = useState(0);

    useEffect(() => {
        if (props.images && props.images.length > 0) {
            setImageView(props.images[0].image);
            setIdImageView(0);
        }
    }, [props.images]);

    const handleThumbnailClick = (index) => {
        setImageView(props.images[index].image);
        setIdImageView(index);
    };

    return (
        <div className={style.container}>
            <div className={style.apercu}>
                <Image imageClassName={style.image} src={imageView} alt="apercu" />
            </div>
            <div className={style.liste_image}>
                {
                    props.images.map((image, key) => (
                        key !== idImageView && (
                            <Image
                                key={key}
                                imageClassName={style.mini_image}
                                alt='images'
                                src={image.image}
                                onClick={() => handleThumbnailClick(key)}
                                style={{ cursor: 'pointer' }}
                            />
                        )
                    ))
                }
            </div>
        </div>
    );
}
