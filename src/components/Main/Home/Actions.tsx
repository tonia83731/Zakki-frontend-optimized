import { useTranslation } from "react-i18next"

export default function Actions() {
    const { t } = useTranslation();
    const statistic_data = [
        {
            num: '500+',
            text: `${t("statistic_volunteer_engaged")}`
        },
        {
            num: '1,000+',
            text: `${t("statistic_donations_processed")}`
        },
        {
            num: '30+',
            text: `${t("statistic_community_events_hosted")}`
        },
        {
            num: '2,500+',
            text: `${t("statistic_people_supported")}`
        },
        {
            num: '7,500+',
            text: `${t("statistic_volunteer_hours_logged")}`
        },
    ]
    return <section id="actions" className="bg-neutral_20 mt-12 md:mt-16">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-12 flex flex-col gap-6 md:grid md:grid-cols-[1.5fr_4fr] md:gap-10">
            <div className="flex flex-col gap-4">
                <h4 className="font-bold text-xl text-dark font-poppins">By the Numbers...</h4>
                <div className="hidden md:block text-sm">Our journey so far — measurable milestones that showcase the collective impact of volunteers, donors, and supporters.</div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-4">
                {
                    statistic_data.map(({num, text}) => {
                        return <div className="flex flex-col gap-1 items-center min-w-[130px]">
                            <div className="text-green_border text-4xl md:text-3xl font-extrabold">{num}</div>
                            <div className="text-sm md:text-xs text-dark_60">{text}</div>
                        </div>
                    })
                }
            </div>
        </div>
    </section>
}


// 500+ Volunteers Engaged
// 1,000+ Donations Processed
// 30+ Community Events Hosted
// 2,500+ People Supported
// 7,500+ Volunteer Hours Logged

// Over 500 volunteers engaged
// 超過 500 名志工參與
// Lebih dari 500 relawan terlibat

// More than 1,000 donations processed
// 超過 1,000 筆捐贈處理
// Lebih dari 1.000 donasi diproses

// 30+ community events hosted
// 舉辦超過 30 場社區活動
// Lebih dari 30 acara komunitas diselenggarakan

// Support provided to over 2,500 people
// 支援超過 2,500 人
// Dukungan diberikan kepada lebih dari 2.500 orang

// 7,500+ volunteer hours contributed
// 志工貢獻超過 7,500 小時
// Lebih dari 7.500 jam relawan disumbangkan