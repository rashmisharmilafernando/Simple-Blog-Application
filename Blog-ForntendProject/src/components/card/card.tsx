 import {useNavigate} from "react-router-dom";

interface Props {
  title: string,
    content: string
    author:string
}

function Card(props: Props): JSX.Element {

  const navigate = useNavigate();
 
    return(
      <div className={'w-72 p-5 border-solid border-2 m-5'}>
        <h1 className={'text-2xl font-bold mb-2'}>{props.title}</h1>
         <button className={'bg-cyan-600 p-2 text-white'} onClick={() => navigate('/blog', {state: {title: props.title, description: props.content, author:props.author}})}>Read More...</button>
      </div>
    );
}

export default Card;