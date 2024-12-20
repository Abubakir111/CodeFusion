// import style from "./renderingConsole.module.css"
import { isPrimitive } from "../Typefiltration/Typefiltration";
import { useEffect, useState } from "react";
import PrimitiveTypes from "../PrimitiveTypes/PrimitiveTypes";
import NotPrimitive from "../NotPrimitive/NotPrimitive";

const RenderingConsole = ({ loading, data }) => {
    const [filtration, setАiltration] = useState(false)
    useEffect(() => {
        if (!data === "") data.map(data => setАiltration(isPrimitive(data)))
    }, [data])
    console.log(filtration);

    console.log(data);

    return <div >
        {loading && <span>loading......</span>}
        {filtration == true ? <PrimitiveTypes data={data} /> : <NotPrimitive />}
    </div>
};

export default RenderingConsole;
