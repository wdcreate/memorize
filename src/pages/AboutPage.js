import ButtonRegBlock from "../components/ButtonRegBlock"
import "./styles/AboutPage.scss";

function AboutPage() {
  return (
    <div className="aboutpage">
      <article>
        <h1>About</h1>
        <p>
          Welcome to our App, the ultimate tool for saving foreign words and
          their translations. Our application is designed to help you learn new
          languages in a simple and intuitive way. With our flashcards, you can
          easily save new words and practice them at your own pace.
        </p>
        <h2>Our Features</h2>
        <p>
          Our application comes with a range of features that make language
          learning a breeze:
        </p>
        <ul>
          <li>Simple and intuitive interface</li>
          <li>Fast and reliable performance</li>
          <li>Easy-to-use flashcards</li>
          <li>Ability to save and repeat words</li>
        </ul>
        <h2>Our Mission</h2>
        <p>
          Our mission is to make language learning fun and effortless,
          regardless of your level. We believe that learning a new language
          should be an enjoyable and seamless experience, and that's why we
          developed this App.
        </p>
        <p>
          We are committed to providing a high-quality language learning
          experience. We are constantly updating and improving our application
          to ensure that our users receive the best possible service. Join us on
          our language learning journey today!
        </p>
      </article>
      <h1>Explore and collect <br />your new words</h1>
      <ButtonRegBlock/>

    </div>
  );
}

export default AboutPage;
