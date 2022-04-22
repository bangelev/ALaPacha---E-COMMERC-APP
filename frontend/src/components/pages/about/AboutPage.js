import React from 'react'

import MetaData from '../../layout/MetaData'

import SectionOne from './SectionOne'
import SectionTwo from './SectionTwo'
import SectionThree from './SectionThree'
import ContactInfo from './ContactInfo'

const AboutPage = () => {
  return (
    <>
      <MetaData title="About" />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <ContactInfo />
    </>
  )
}

export default AboutPage
