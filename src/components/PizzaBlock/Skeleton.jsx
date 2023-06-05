import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="-2" y="265" rx="10" ry="10" width="280" height="25" /> 
    <rect x="0" y="307" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="426" rx="10" ry="10" width="90" height="25" /> 
    <rect x="132" y="415" rx="25" ry="25" width="150" height="45" /> 
    <circle cx="138" cy="125" r="125" /> 
    <circle cx="121" cy="144" r="8" />
  </ContentLoader>
)

export default Skeleton
