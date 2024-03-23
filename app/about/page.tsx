import React from 'react'
import styles from "@/app/adminn/about.module.css";
import HeaderNav from '../components/HeaderNav';


const AboutPage = () => {
  return (
    <div>
        <HeaderNav/>
        <div className={styles.textContainer}>
            <h2>About we</h2>
            <h1>Chúng tôi tạo ra một nền tảng học tập online lớn</h1>
            <p>Trong dòng chảy cuộc sống hiện đại nhiều hành vi, nhiều quan điểm mới được hình thành. 
                Nhưng có những giá trị sẽ mãi mãi là nền tảng vững chãi cho cuộc sống hạnh phúc và thịnh vượng. 
                Một trong những giá trị tốt đẹp ấy chính là tình yêu. Đó là tình yêu với chính bản thân mình và với xã hội</p>
        </div>
        <div className={styles.imgContainer}></div>
    </div>
  )
}

export default AboutPage