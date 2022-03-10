import { NextPage } from 'next'
import Header from '../component/header'

const Static: NextPage = () => {
    return (
        <div>
            <Header />
            <main className="main">
                <h1>Static</h1>
                <p>Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus.</p>
            </main>
        </div>
    )
}

export default Static
