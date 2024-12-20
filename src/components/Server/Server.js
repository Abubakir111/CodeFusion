import axios from 'axios';

const urlLocalNode = 'http://localhost:5000/execute-js';
const URLPython = 'https://dockerpythonexecutor-production.up.railway.app/';
const URLNode = 'https://dockerjavascriptexecutor-production.up.railway.app/';

const Server = async ({ language, code }) => {
  console.log(code);
  const url = language === 'python' ? URLPython : URLNode;
  try {
    // Отправляем данные на сервер
    const response = await axios.post(url, {
      code: code // Код, введённый в редактор (из state `code`)
    });

    // Обрабатываем ответ
    const { status, data, error, stack } = response;
    console.log(response);

    return {
      status: status,
      result: data.consoleOutput
    };
  } catch (err) {
    console.error(err);
    return {
      status: err.response?.status || 500,
      result: err.response?.data?.error || 'Unknown error occurred'
    };
  }
};

export default Server;
