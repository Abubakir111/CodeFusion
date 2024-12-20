

export const CostomEditor = {

    base: 'vs-dark',
    inherit: true,
    rules: [
        { token: 'comment', foreground: 'ff0000', fontStyle: 'italic' },
        { token: 'keyword', foreground: '00ff00' },
        { token: 'string', foreground: '0000ff' }
    ],
    colors: {
        'editor.background': '#111B25', // Красный фон редактора
        'editor.foreground': '#ffffff' // Белый текст
    }

};
export const CostomEditorOption = (editor) => {
    editor.updateOptions({
        padding: { top: 8, bottom: 0, left: 0 }, // Установка padding сверху
        wordWrap: 'on', // Включение переноса строк
        lineDecorationsWidth: 0, // Убирает отступ для декораций
        lineNumbers: 'on', // Показывает номера строк, если нужно
        hideCursorInOverviewRuler: true, // Скрывает курсор в обзоре
        renderLineHighlight: 'none', // Убирает подсветку строки
        overviewRulerBorder: false, // Убирает бордер у обзор
        fontSize: 20,// Устанавливает размер шрифта в редакторе
        lineNumbersMinChars: 2 // Ширина области номеров строк (минимум 3 символа)
    });
    // Получаем контейнер редактора
    const editorContainer = document.querySelector('.monaco-editor');

    // Устанавливаем border-radius для контейнера
    if (editorContainer) {
        editorContainer.style.borderRadius = '15px';
        editorContainer.style.overflow = 'hidden'; // Чтобы уголки не обрезались
    }
}



