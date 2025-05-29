import { useEffect, useState } from "react";
import { client } from "../../../lib/sanity";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import PageContainer from "../../common/PageContainer"
import { Link } from "react-router-dom";


type NewsType = {
    title: string
    slug: string
    image: string
    published_at: string
    introduction: string
}

const LattestNews = () => {
    const { t, i18n } = useTranslation();
    const curr_lng = i18n.language as "en" | "ina" | "zh";
    const [mainNews, setMainNews] = useState<NewsType | null>(null)
    const [topNews, setTopNews] = useState<NewsType[]>([])


    useEffect(() => {
        const fetchNews = async () => {
            try {
                    const data = await client.fetch(
                      `*[_type == "news" && is_published == true && is_primary == true && locale== "${curr_lng}"] | order(orderRank, published_at){
                        title,
                        "slug": slug.current,
                        "image": image.asset->url,
                        published_at,
                        introduction
                      }`
                    );
                    setMainNews(data[0])
                    setTopNews(data);
                  } catch (error) {
                    console.error("Sanity fetch error:", error);
                  }
        }
        fetchNews()
    }, [])
    return <section id="lattest-news">
        <PageContainer>
            <div className="flex flex-col gap-8">
                <div className="w-1/2 md:w-1/3 max-w-[300px] mx-auto pb-4 border-b-4 border-warning font-poppins font-bold text-xl text-dark text-center">
                {t("news")}
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-6">
                    <div className="hidden md:flex flex-col gap-2">
                        <img src={mainNews?.image} alt={mainNews?.title} className="w-full h-[210px] object-cover" />
                        <div className="">
                            <h4 className="font-bold text-lg">{mainNews?.title}</h4>
                            <div className="text-sm">{mainNews?.introduction}</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        {
                            topNews.map((news, idx) => {
                                if (idx === 0) return
                                return <Link to={`/news/${news.slug}`} className={`grid grid-cols-[3fr_1fr] gap-2 py-2 ${idx !== 1 && 'border-t border-dark_20'}`} key={news.title}>
                                    <div className="">
                                        <p className="text-sm text-error font-bold ">Top {idx}</p>
                                        <h4 className="font-bold text-lg">{news.title}</h4>
                                        <p className="text-sm text-dark_60">{dayjs(news.published_at).format('YYYY-MM-DD')}</p>
                                    </div>
                                    <img src={news.image} alt={news.title} className="w-full h-[80%] object-cover" />
                                </Link>
                            })
                        }
                    </div>
                </div>
                <div className="flex justify-center">
                <Link to="/news" className="text-green_border border border-green_border px-4 py-2 rounded-lg w-fit hover:border-0 hover:bg-green_focus hover:text-white">{t("learn_more")}</Link>
                </div>
            </div>
        </PageContainer>
    </section>
}

export default LattestNews