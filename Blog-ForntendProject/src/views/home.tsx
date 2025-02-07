import React, {useEffect, useState} from 'react';
import Card from "../components/card/card";
import axios from "axios";

interface Data {
  body: string | undefined;
  id: number,
  title: string,
  description: string,
  author:string
}

function Home(): JSX.Element {

  const[data, setData] = useState<Data[]>([]);
  const fetchData = (): void => {
      axios.get('http://localhost:5000/posts?size=100&page=1').then(response => {
          setData(response.data.data);
      }).catch(err => {
          console.log(err);
      })
  }

    useEffect(() => {
        fetchData();
        console.log("Called");
    }, []);

    return(
      <section>
      <div
        className={'grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-fit relative m-auto'}>

        {
          data.map((r: Data, index: number) => {
            return <Card title={r.title} content={r.description} author={r.author} />
          })
        }

      </div>
    </section>
    );

}

export default Home;