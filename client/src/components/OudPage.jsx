// import React, { useState, useEffect } from "react";
// import "./OudPage.css";
// import axios from "axios";
// export default function OudPage() {
//   const [admin, setAdmin] = useState(null);

//   useEffect(() => {
//     const search = async () => {
//       const response = await axios.get("http://localhost:5000/teachers");
//       setAdmin(response);
//     };
//     search();
//   }, []);
//   console.log(admin);
//   return (
//     <div className="mainOudPage">
//       <div className="Oudteacherscontainer">
//         <div>{admin}</div>
//       </div>
//       <div className="socialcontainer">
//         <div>Social</div>
//       </div>
//     </div>
//   );
// }