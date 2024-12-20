import ContentBox from "../ContentBox/ContentBox";
import style from "./editorToolbar.module.css"

const EditorToolbar = ({ language, setLanguage, handleRunCode }) => (<ContentBox
    content1="Language:"
    content2={
        <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={style.select}
        >
            <option value="python">python</option>
            <option value="javascript">javascript</option>
        </select>
    }
    content3={<button onClick={handleRunCode}>Run</button>}
/>);
export default EditorToolbar;