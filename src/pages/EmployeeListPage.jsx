import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import EmployeeList from '../components/Employee/EmployeeList'
import Footer from '../components/Footer/Footer'

const EmployeeListPage = () => {
  return (
    <>
    <Navbar/>
    <EmployeeList/>
    <Footer/>
    </>
  )
}

export default EmployeeListPage