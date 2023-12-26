import { AboutMap } from "../cmps/AboutMap";


export function About() {

    return (
        <section className="about">

            <header className="about-header">
                <h1>Welcome to Toys Not For Us</h1>
                <p>Your go-to destination for toys that are so cool, even adults secretly wish they were kids again!</p>
            </header>

            <section>
                <h1>About Us</h1>
                <p>At Toys Not For Us, we believe that toys should be more than just playthings; they should be gateways to a world where imagination knows no bounds. Our journey began with a simple question: Why should kids have all the fun? And so, Toys Not For Us was born!</p>

                <p>We've scoured the globe for the quirkiest, most whimsical toys that will make you question your adulthood choices. Our team of toy experts (who may or may not be actual elves) has handpicked a selection that will transport you to a land where responsibilities are just a distant rumor.</p>

                <p>Explore our magical inventory and rediscover the joy of play. But before you dive in, here are some of our imaginary competitors who just can't match up to the awesomeness of Toys Not For Us:</p>
                {/* <AboutMap></AboutMap> */}
                <AboutMap></AboutMap>

             

                <p>Remember, at Toys Not For Us, we don't just sell toys; we sell tickets to a perpetual recess where the only homework is having a blast!</p>
            </section>
        </section>
    )
}