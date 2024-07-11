
import "./Footer.scss"

const Footer = () => {
    return (
        <div className="footer-container">
          <div className="item-section">
          <div className="footer1">
            <h1 style={{color:"white"}}>Get in Touch</h1>
             <p style={{color:"grey"}}>We'd love to hear from you! Whether you have questions,feedback, or need assistance, our team is here to help.Feel free to reach out to us through any of the following methods:</p>
             <div className="icon-section">

             
             <img style={{width:"40px", height:"40px"}} src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png" alt="" />
             <img style={{width:"40px", height:"40px"}} src="https://cdn-icons-png.flaticon.com/128/145/145807.png" alt="" />
             <img style={{width:"40px", height:"40px"}} src="https://cdn-icons-png.flaticon.com/128/145/145802.png" alt="" />
             <img style={{width:"40px", height:"40px"}} src="https://cdn-icons-png.flaticon.com/128/3670/3670151.png" alt="" />
            </div>
          </div>
          <div className="footer2">
            <img style={{width:"40px", height:"40px"}} src="https://cdn-icons-png.flaticon.com/128/732/732200.png" alt="" />
            <h3 style={{color:"white"}}>contact@example.com</h3>
          </div>

          </div>
         
        </div>
    )
}

export default Footer