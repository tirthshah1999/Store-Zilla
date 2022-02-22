import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return (
    <main>
      <PageHero title="About" />
      <Wrapper className='page section section-center'>
        <img src={aboutImg} alt="desk" />
        <article>
          <div className="title">
            <h2>Our Story</h2>
            <div className="underline"></div>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae excepturi, vitae architecto omnis fuga eaque sit! Culpa hic obcaecati numquam consequuntur libero quam velit? Laborum illum omnis molestiae obcaecati doloremque assumenda consequuntur! Ab veniam corporis reiciendis? Quas minus ducimus quaerat quidem, molestias illum vel obcaecati non porro soluta assumenda similique!</p>
        </article>
      </Wrapper>
    </main>

  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
