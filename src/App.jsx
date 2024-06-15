import { useEffect, useState } from 'react'
import TextBox from './components/TextBox'
import Footer from './components/Footer'

export default function App() {
  const [novel, setNovel] = useState('/book1.txt')
  const [paraCount, setParaCount] = useState('3')
  const [wordCount, setWordCount] = useState(100)
  const [sentences, setSentences] = useState([])

  function selectRandomWords(words, n) {
    const selectedWords = []
    for (let i = 0; i < n; i++) {
      const randomIndex = Math.floor(Math.random() * words.length)
      if (!selectedWords.includes(words[randomIndex])) {
        selectedWords.push(words[randomIndex])
      }
    }
    return selectedWords
  }

  async function fetchWord() {
    const res = await fetch(novel)
    const str = await res.text()
    const words = str
      .replace(/[^가-힣\s]/g, '') // 한글을 제외한 모든 부호 제거
      // .replace(/["'.]/g, '')
      .split(' ')
      .map(word => word.trim())   

    const sentences = []
    for (let i = 0; i < parseInt(paraCount); i++) {
      const selectedWords = selectRandomWords(words.slice(), wordCount)
      const makedSentence = selectedWords.join(' ') + '.'
      sentences.push(makedSentence)
    }
    setSentences(sentences)
  }

  useEffect(() => {
    fetchWord()
  }, [])

  return (
    <>
      <header>
        <h1>한글입숨</h1>
      </header>
      <div className='control'>
        <div>
          <label>작품</label>
          <select value={novel} onChange={e => setNovel(e.target.value)}>
            <option value='/book1.txt'>청춘예찬</option>
            <option value='/book2.txt'>메밀꽃 필 무렵</option>
            <option value='/book3.txt'>운수좋은 날</option>
          </select>
        </div>
        <div>
          <label>단어</label>
          <input type='text' value={wordCount} onChange={e => setWordCount(e.target.value)} />
        </div>
        <div>
          <label>문단</label>
          <select value={paraCount} onChange={e => setParaCount(e.target.value)}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        </div>
        <button onClick={() => fetchWord()}>만들기</button>
      </div>

      {wordCount > 500 && (
        <div className="modal">
          <div className="inner">
            <p>단어수는 최대 <b>500단어</b> 입니다.</p>
            <div className='btn'>
              <button onClick={() => setWordCount(100)}>확인</button>
            </div>
          </div>
        </div>
      )}
      <div className='container'>
        {sentences.map((item, index) => (
          <TextBox key={index} text={item} />
        ))}
      </div>
      <Footer />
    </>
  )
}
