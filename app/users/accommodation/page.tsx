// index.tsx
'use client';

import Filter from "@/components/Filter";
import Review from "@/components/Review";
import SwiperCarousel from "@/components/Swiper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rating } from "@/components/ui/rating";
import API_BASE_URL from "@/util/config";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Suggestion {
    id: string;
    total_likes: number;
    image: string;
    note_moyenne: number;
    nom_hebergement: string;
    ville: string;
    description_hebergement: string;
}

interface Review {
    note: number;
    commentaire: string;
    hebergement: {
        nom_hebergement: string;
        localisation: {
            adresse: string;
            ville: string;
        };
    };
    client: {
        username: string;
        profilPic: string;
    };
}

export default function Home() {
    const { t } = useTranslation();
    const router = useRouter();
    const [suggestions, setSuggestions] = useState<{ hebergements: Suggestion[] }>({ hebergements: [] });
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [suggestionsRes, reviewsRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/hebergement/suggestion/`),
                    fetch(`${API_BASE_URL}/api/hebergement/avis-clients/`)
                ]);

                const suggestionsData = await suggestionsRes.json();
                const reviewsData = await reviewsRes.json();

                setSuggestions(suggestionsData);
                setReviews(reviewsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Head>
                <title>Luxury Accommodations</title>
            </Head>

            <main className="min-h-screen bg-white dark:bg-gray-900">
                {/* Hero Section */}
                <section className="relative h-[700px]">
                    <SwiperCarousel />
                    <div className="absolute bottom-0 w-full px-4 md:px-20 z-10">
                        <Filter />
                    </div>
                </section>

                {/* Suggestions Section */}
                <section className="max-w-7xl mx-auto px-4 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                            Suggestions for you
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {suggestions.hebergements?.map((suggestion) => (

                                <Card
                                    key={suggestion.id}
                                    className="group hover:shadow-xl transition-shadow duration-300"
                                    onClick={() => router.push(`/users/accommodation/${suggestion.id}`)}
                                >


                                    <div className="relative h-64 w-full overflow-hidden rounded-t-lg">
                                        <Image
                                            src={suggestion.image || "/placeholder.svg"}
                                            alt={suggestion.nom_hebergement}
                                            // layout="fill"
                                            width={150}
                                            height={100}
                                            className="group-hover:scale-110 transition-transform duration-300"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <h3 className="text-2xl font-semibold">{suggestion.nom_hebergement}</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{suggestion.ville}</p>
                                        <Rating value={suggestion.note_moyenne} />
                                        <p className="line-clamp-3">{suggestion.description_hebergement}</p>
                                    </div>

                                </Card>
                            ))}
                        </div>

                        <div className="flex justify-end">
                            <Button
                                onClick={() => router.push("/users/accommodation/filter")}
                                className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black"
                            >
                                See more
                            </Button>
                        </div>
                    </motion.div>
                </section>

                {/* Services Section */}
                <section className="bg-gray-50 dark:bg-gray-800 py-20">
                    <div className="max-w-7xl mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="space-y-16"
                        >
                            <h2 className="text-4xl font-bold text-center">{t("get_best_service")}</h2>

                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="relative h-[400px] rounded-2xl overflow-hidden">
                                    <Image
                                        src="/images/accommodation.webp"
                                        alt="Luxury Service"
                                        layout="fill"
                                        style={{ objectFit: "cover" }}
                                        className="rounded-2xl"
                                    />
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    {["Quality", "Transparency", "Customer Experience", "Support"].map((service) => (
                                        <Card key={service} className="p-6 space-y-4 hover:shadow-lg transition-shadow">
                                            <h3 className="text-xl font-semibold">{service}</h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                Premium service quality guaranteed for our valued customers.
                                            </p>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Reviews Section */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center space-y-4 mb-12">
                            <h2 className="text-4xl font-bold">Customer Reviews</h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                See what our guests have to say about their experiences
                            </p>
                        </div>

                        <div className="flex space-x-6 overflow-x-auto pb-8 snap-x">
                            {reviews.map((review, index) => (
                                <Review
                                    key={index}
                                    rate={review.note}
                                    review={review.commentaire}
                                    nom={review.hebergement.nom_hebergement}
                                    username={review.client.username || "Guest"}
                                    userPhoto={review.client.profilPic}
                                    localisation={`${review.hebergement.localisation?.adresse || ""} - ${review.hebergement.localisation?.ville || ""}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}