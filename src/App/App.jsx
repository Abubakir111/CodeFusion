import { useState, useEffect } from 'react';
import { CostomEditor, CostomEditorOption } from '../components/CustomEditor/CostomEditor';
import Editor from '@monaco-editor/react';
import style from './app.module.css';
import logo from "../assets/logo.svg"
import logoCode from "../../public/logoCode.svg"
import ContentBox from '../components/ContentBox/ContentBox';
import EditorToolbar from '../components/EditorToolbar/EditorToolbar';
import Server from '../components/Server/Server';
import { Typefiltration } from '../components/Typefiltration/Typefiltration'
import RenderingConsole from '../components/RenderingConsole/RenderingConsole';
const App = () => {

  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false); // Флаг загрузки
  const [output, setOutput] = useState('');
  const [testResult, setTestResult] = useState('');

  console.log(testResult);
  console.log(output);
  useEffect(() => {
    if (output !== "") {
      console.log(output.result)
      console.log(Typefiltration(output.result));
      setTestResult(Typefiltration(output.result))
    }
  }, [output])

  useEffect(() => {
    if (window.editor) {
      window.editor.getModel().setLanguage(language); // Обновляем язык модели редактора
    }
  }, [language]);
  const handleRunCode = async () => {
    setLoading(true); // Устанавливаем флаг загрузки
    const result = await Server({ language, code })
    try {
      const result = await Server({ language, code }); // Ждём ответа от сервера
      setOutput(result); // Устанавливаем результат в состояние
    } catch (error) {
      setOutput(result);
    } finally {
      setLoading(false); // Сбрасываем флаг загрузки
    }
  }
  const handleEditorWillMount = (monaco) => monaco.editor.defineTheme('myCustomTheme', CostomEditor);
  const handleEditorDidMount = (editor) => CostomEditorOption(editor)
  return (
    <div className='container'>
      <div className={style.app_container}>
        <div className={style.logo_container}>
          <img className={style.logo} src={logo} alt="logo" />
        </div>
        <div className={style.container}>
          <div className={style.editor}>
            <EditorToolbar
              language={language}
              setLanguage={setLanguage}
              handleRunCode={handleRunCode}
            />
            <div className={style.border}>
              <Editor
                height='100%'
                width='100%'
                language={language}
                value={code}
                onChange={(value) => setCode(value || '')}
                theme='myCustomTheme'
                onMount={handleEditorDidMount}
                beforeMount={handleEditorWillMount} // Задаём тему до монтирования
              />
            </div>
          </div>
          <div className={style.container_output}>
            <ContentBox content1={<div className={style.title}> <div className={style.result}> Result:</div>  <img className={style.logoCode} src={logoCode} alt="logoCode" /></div>} addClass="dynamicClassBorderRadius" />
            <div className={style.output}>
              <RenderingConsole loading={loading} data={testResult} />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default App;
