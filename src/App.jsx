import { useEffect, useState } from 'react'
import TextBox from './components/TextBox'
import book1 from '/book1.txt'

export default function App() {
  const [selectedOption, setSelectedOption] = useState('3')
  const [count, setCount] = useState(100)
  const [sentences, setSentences] = useState([])

  // 함수: 랜덤 단어 10개 선택 (중복 제거)
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
    const res = await fetch(book1)
    const str = await res.text()
    const words = str
      .replace(/[^가-힣\s]/g, '')
      .split(' ')
      .map(word => word.trim())

    const sentences = []
    if (count > 500) {
      alert('단어수는 500단어까지 설정할 수 있습니다.')
      setCount(100)
      return
    }

    for (let i = 0; i < parseInt(selectedOption); i++) {
      const selectedWords = selectRandomWords(words.slice(), count) // words.slice()를 사용하여 words 배열 복사본 생성
      const makedSentence = selectedWords.join(' ') + '.'
      sentences.push(makedSentence)
    }
    setSentences(sentences)
  }

  useEffect(() => {
    fetchWord()
  }, [])

  function handleChange(e) {
    setSelectedOption(e.target.value)
  }

  return (
    <>
      <header>
        <h1>한글입숨</h1>
      </header>
      <div className='control'>
        <div>
          <label htmlFor=''>소설</label>
          <select name='' id=''>
            <option value='1'>청춘예찬</option>
            <option value='2'>메밀꽃 필 무렵</option>
            <option value='3'>필론의 돼지</option>
          </select>
        </div>
        <div>
          <label htmlFor=''>단어수</label>
          <input
            type='text'
            value={count}
            onChange={e => setCount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor=''>문단수</label>
          <select value={selectedOption} onChange={handleChange}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        </div>
        <button onClick={() => fetchWord()}>만들기</button>
      </div>
      <div className='container'>
        {sentences.map((item, index) => (
          <TextBox key={index} text={item} />
        ))}
      </div>
      <footer>harimbu@gmail.com</footer>
    </>
  )
}
