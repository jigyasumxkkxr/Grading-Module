import Navbar from "./Navbar"
import homeImage from "../assets/react.png"
import { Link } from "react-router-dom"


export const Home = () => {
    return (
        <div className="w-screen min-h-screen max-h-fit flex flex-col gap-16">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
            <Navbar />
            <div className=" h-full w-full grow flex items-center justify-around gap-12">
                <div className="h-full"> 
                    <img src={homeImage} alt="" className="h-96" />
                </div>
                <div className="flex flex-col justify-start text-center gap-6">
                    <div>
                        <div className="text-xl">
                            Indian Institute of Technology, Jammu
                        </div>
                        <div>
                            CS-3-09(MO)  Database Management System (DBMS)
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center">
                            
                            <div className="text-2xl px-2 font-semibold hover:bg-black hover:text-white">
                                MODULE FOR GRADING AND GRADESHEET
                            </div>
                        </div>
                        <div className="text-sm flex items-center justify-center gap-8">
                            <div className="flex flex-col text-center">
                                <div>
                                    2022UME0209
                                </div>
                                <div>
                                    2022UMT0171
                                </div>
                                <div>
                                    2022UMT0173
                                </div>
                                <div>
                                    2022UMT0186
                                </div>
                                <div>
                                    2022UMT0183
                                </div>
                            </div>
                            <div className="flex flex-col text-center">
                                <div>
                                    Jigyasu
                                </div>
                                <div>
                                    Kashish
                                </div>
                                <div>
                                    Mohit Pooniya
                                </div>
                                <div>
                                    Sutar Pranav Prakash
                                </div>
                                <div>
                                    Shubham Mandal
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-1 justify-end pr-8">
                For Admin login <Link to={"/login-admin"} className="hover:underline">click here</Link>
            </div>
        </div>
    )
}