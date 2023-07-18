import 'dotenv/config'
import styles from './page.module.css'
import Layout from './layout'
import { useState } from 'react'
import { Configuration, OpenAIApi } from "openai";
import basededatos from './basededatos.json'
import { cosineSimilarity } from 'cosine-similarity-threshold'

const configuration = new Configuration({ apiKey:atob('c2stZW5SZzBRSUVTcDBsTWsxS2hNN3pUM0JsYmtGSnBoM3RCRkJUaHlTeVZyWFgyVURE') });
const openai = new OpenAIApi(configuration);

export default function Categories() {

  const [texareaValue, setTexareaValue] = useState('')
  const [categories, setCategories] = useState([])

  const handleSubmit = async () => {
    const emb = await openai.createEmbedding({ model: 'text-embedding-ada-002', input: texareaValue })
    const objeto = emb?.data?.data[0]?.embedding;
    const arraydeObjetos = []

    for (const dato of basededatos) {
      const dist = cosineSimilarity(objeto, dato.vec);
      arraydeObjetos.push({ name: dato.name, dist })
      // console.log(arraydeObjetos.length)
    }
    arraydeObjetos.sort((a, b) => b.dist - a.dist);
    //  console.log(arraydeObjetos);
    const primerosDiezElementos = arraydeObjetos.slice(0, 20);
    setCategories(primerosDiezElementos);

  }

  return (
    <Layout>
      <main className={styles.main}>
        <div>
          <h2>
            Submit your article
          </h2>
          <br></br>
          <div>
            <textarea style={{ width: 600, height: 300, padding: 10 }} value={texareaValue} placeholder='Please paste the content of the article' onChange={(e) => setTexareaValue(e.target.value)}>
            </textarea>
          </div>
          <button style={{ height: 50, width: 100 }} onClick={handleSubmit}>
            Submit
          </button>

          <div>
            {categories.length > 0 &&
              categories.map((category, index) => {
                return (
                  <div key={index}>
                    {category.name} -- {category.dist}
                  </div>
                )
              }
              )
            }

          </div>
        </div>
      </main>
    </Layout>
  )
}