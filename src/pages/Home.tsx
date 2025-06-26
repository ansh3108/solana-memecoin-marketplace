import React from "react";
import { Link } from "react-router-dom";


const fakeTokens = [
    { name: "MEOW", symbol: "MEOW", mint: "FakeMint1" },
    { name: "BODEN", symbol: "BODEN", mint: "FakeMint2" },
    { name: "WEN", symbol: "WEN", mint: "FakeMint3" },
];

const Home: React.FC = () => {
    return (
        <div>
            <h2>Trending Memecoins</h2>
            <ul>
                {fakeTokens.map((token) => (
                    <li key={token.mint}>
                        <Link to={`/token/${token.mint}`}>
                            {token.name} ({token.symbol})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default Home; 