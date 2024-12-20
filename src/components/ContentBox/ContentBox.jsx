import style from './сontentBox.module.css';

const ContentBox = ({ content1, content2, content3, addClass }) => {
  return (
    <div className={`${style.container} ${addClass && style[addClass]}`}>{content1}{content2}{content3} </div>
  );
};


export default ContentBox;
