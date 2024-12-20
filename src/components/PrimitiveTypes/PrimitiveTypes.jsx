import style from "./primitiveTypes.module.css";

const PrimitiveTypes = ({ data }) => {
    return <div>{
        data && data.map((result, index) => (
            typeof result === "string" ?
                <pre key={index} className={style.string}>{`"${result}"`}</pre>
                : typeof result === "boolean" ?
                    <pre key={index} className={style.boolean}>{`${result}`}</pre>
                    : typeof result === "number" ? <pre key={index} className={style.number}>{`${result}`}</pre>
                        : ""))}</div>;
};

export default PrimitiveTypes;
