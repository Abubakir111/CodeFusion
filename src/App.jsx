import { useState, useEffect } from 'react';
import { createServer } from 'miragejs';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import './App.css'; // Подключаем стили

// Mock server setup
createServer({
  routes() {
    this.post('/api/execute', (schema, request) => {
      const { language, code } = JSON.parse(request.requestBody);

      if (code.includes('error')) {
        return {
          status: 'error',
          error: `SyntaxError: Unexpected token in ${language} code.`
        };
      }

      return {
        status: 'success',
        output: `Output for the code in ${language}:\nHello, world!\n`
      };
    });
  }
});

const App = () => {
  useEffect(() => {
    // Применяем кастомную тему
    monaco.editor.defineTheme('myCustomTheme', {
      base: 'hc-black',
      inherit: true,
      colors: {
        'editor.background': '#ff0000', // Красный фон редактора
        'editor.foreground': '#ffffff' // Белый текст
      },
      rules: [] // Добавь дополнительные правила, если нужно
    });

    monaco.editor.setTheme('myCustomTheme');
  }, []);

  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);

  const handleRunCode = async () => {
    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code })
      });

      const result = await response.json();
      if (result.status === 'success') {
        console.log(' run result ', result);
        setIsError(false);
        setOutput(result.output);
      } else {
        setIsError(true);
        setOutput(result.error);
      }
    } catch (error) {
      setIsError(true);
      console.log(error);
      setOutput('An unexpected error occurred.');
    }
  };

  return (
    <div className='app-container'>
      <h1>Online Code Editor</h1>
      <div className='container'>
        <div className='ui'>
          <label htmlFor='language-select'>Choose Language:</label>
          <select id='language-select' value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value='python'>Python</option>
            <option value='go'>Go</option>
          </select>
          <button onClick={handleRunCode}>Run</button>
        </div>
        <div className='controls'>
          <Editor
            height='100vh'
            width='100%'
            defaultLanguage={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme='myCustomTheme'
          />
          <div className={`output ${isError ? 'error' : 'success'}`}>
            <h2>Output:</h2>
            <pre>{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
