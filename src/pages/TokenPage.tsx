import React from "react";
import { useParams } from "react-router-dom";

const TokenPage: React.FC = () => {
    const { mint} = useParams();

    return (
        <div>
            <h2>Token Details for Mins: {mint}</h2>
            <p>Here we'll show charts, trading box and stats.</p>
        </div>
    );
};

export default TokenPage;