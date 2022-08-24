import React, { useEffect } from "react"
import { axiosPrivate } from "../../../../utils/axios"
import url from "../../../../utils/baseUrl"

import ServiceCard from "./ServiceCard"
// var bnr = require("./../../images/banner/bnr1.jpg");

const postBox = [
  { title: "This is a short description of the services 1" },
  {
    title:
      "This is a short description of the services 2 this continue from here",
  },
  { title: "This is a short description of the services 3" },
  { title: "This is a short description of the services 4" },
  { title: "Digital Marketing Executive" },
]

function Services({ id }) {
  const [services, setServices] = React.useState([])
  const allData = () => {
    // axios({
    // 	method: 'GET',
    // 	url: `${baseURL}api/v1/account/professional-services/`,

    // })
    axiosPrivate
      .get(`${url.baseURL}api/v1/account/professional-services/?user_id=${id}`)
      .then((res) => {
        console.log(res.data.results)
        setServices(res.data.results)
      })
      .catch((e) => {
        if (e.response?.status === 400) {
          console.log(e?.response?.data?.non_field_errors[0])
        } else {
          console.log("Unknown Error")
        }
      })
  }

  useEffect(() => {
    allData()
  }, [])
  return (
    <div>
      <ul className="row">
        {services.length > 0 &&
          services?.map((item, index) => (
            <div className="col-lg-4 col-sm-12 col-12 m-b20">
              <ServiceCard item={item} key={index} />
            </div>
          ))}
      </ul>
    </div>
  )
}

export default Services
