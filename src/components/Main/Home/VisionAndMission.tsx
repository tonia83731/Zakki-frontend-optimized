import { useTranslation } from "react-i18next";
import PageContainer from "../../common/PageContainer"
import { FaRegEye } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
const VisionAndMission = () => {
    const { t } = useTranslation();
    const vision_datas = [
        t("vision_opt_1"),
        t("vision_opt_2")
    ]
    const mission_datas = [
        t("mission_opt1"),
        t("mission_opt2"),
        t("mission_opt3"),
        t("mission_opt4"),
        t("mission_opt5"),
        t("mission_opt6"),
        t("mission_opt7"),
    ]
    return <section id="vision-and-mission" className="">
        <PageContainer>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4 items-center">
                    <div className="w-1/2 md:w-1/3 max-w-[300px] mx-auto pb-4 border-b-4 border-warning font-poppins font-bold text-xl text-dark text-center">
                    {t("vision_and_mission")}
                    </div>
                </div>
                <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
                    <div className="bg-white rounded-lg px-4 py-6 shadow-lg flex flex-col gap-4">
                    <div className="flex items-center gap-4 font-bold text-primary text-lg md:text-2xl">
                            <FaRegEye />
                            <h5>VISION</h5>
                        </div>
                        <ol className="text-sm list-outside list-decimal pl-4 flex flex-col gap-1">
                            {
                                vision_datas.map((v, idx) => {
                                    return <li key={`vision-${idx}`}>{v}</li>
                                })
                            }
                        </ol>
                    </div>
                    <div className="bg-white rounded-lg px-4 py-6 shadow-lg flex flex-col gap-4">
                        <div className="flex items-center gap-4 font-bold text-primary text-lg md:text-2xl">
                            <LuListTodo />
                            <h5> MISSION</h5>
                        </div>
                        <ol className="text-sm list-outside list-decimal pl-4 flex flex-col gap-1">
                            {
                                mission_datas.map((m, idx) => {
                                    return <li key={`mission-${idx}`}>{m}</li>
                                })
                            }
                        </ol>
                    </div>
                </div>
            </div>
        </PageContainer>
    </section>
}

export default VisionAndMission