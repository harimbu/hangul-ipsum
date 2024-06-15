import { useState } from 'react'
import { MdCopyright, MdInfo } from 'react-icons/md'

export default function Footer() {
  const [modal, setModal] = useState(false)

  return (
    <footer>
      <div className='email'>
        <MdCopyright /> harimbu@gmail.com
        <MdInfo className='infoIcon' onClick={() => setModal(!modal)} />
      </div>

      {modal && (
        <div className='modal'>
          <div className='inner'>
            <div className='top'>
              <h3>문학작품 안내</h3>
              <button onClick={() => setModal(!modal)}>닫기</button>
            </div>
            <dl className='info'>
              <dt>1. 청춘예찬</dt>
              <dd>- 요약정보 : 1929년 발표한 민태원의 수필</dd>
              <dd>- 이용조건 : 만료저작물, 자유이용</dd>
              <dt>2. 메밀꽃 필 무렵</dt>
              <dd>- 요약정보 : 1936년 발표한 이효석의 단편소설</dd>
              <dd>- 이용조건 : 만료저작물, 자유이용</dd>
              <dt>3. 운수 좋은 날</dt>
              <dd>- 요약정보 : 1924년 6월 『개벽』48호에 발표 현진건의 단편소설</dd>
              <dd>- 이용조건 : 만료저작물, 자유이용</dd>
            </dl>
          </div>
        </div>
      )}
    </footer>
  )
}
