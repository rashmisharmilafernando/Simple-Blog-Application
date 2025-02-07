import {useLocation} from "react-router-dom";

function Blog(): JSX.Element {

    const location = useLocation();
    const title:any = location.state.title;
    const description:any = location.state.description;
    const author:any = location.state.author;

    console.log(description)

    return(
        <section className={'my-5 mx-5 min-h-[70vh]'}>

            {/*title*/}
            <div className={'text-4xl font-bold text-center'}>{title}</div>

            {/*content*/}
            <div className={'mt-5 no-more-tailwind'}>
                <div dangerouslySetInnerHTML={{__html: description}}></div>
            </div>

             {/*author*/}
             <div className={'text-xxl text-right'}>{author}</div>
        </section>
    )
}

export default Blog;