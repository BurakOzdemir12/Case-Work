import {Link} from "react-router-dom";

export default function NotFound() {
    return (
        <div className="  ">
            <h1 className=" text-white text-2xl font-bold text-center mt-30 ">
                The Page is Not Found Try Links Below
            </h1>
            <div className=" flex justify-center gap-20 mt-20">
                <button className="cursor-pointer bg-stone-300 rounded-full w-auto hover:bg-stone-600  p-2">
                    <Link className="text-slate-950 font-bold" to="/">Home Page</Link>
                </button>

            </div>
        </div>
    )
}
