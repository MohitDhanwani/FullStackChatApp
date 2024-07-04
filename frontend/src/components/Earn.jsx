import React, { useEffect } from 'react';
import "../style/earn.css";

function Earn() {

    return (
        <div className="earn-container">
            <h2 className='earn-heading'>Earn with ChatHub</h2>
            <p>
                At ChatHub, we value your time and engagement. We believe that your interactions should be rewarding, and that’s why we offer several ways for you to earn money just by using our platform.
            </p>
            <h3>Ways to Earn Money:</h3>
            <ul>
                <li>Accumulate 50 hours of active usage and earn $10.</li>
                <li>Spend a total of 300 hours on the platform to receive a bonus of $30.</li>
                <li>Reach 1200 hours of engagement and earn an additional $200.</li>
            </ul>
            <p>
                Besides these, you can also explore other meaningful ways to earn:
            </p>
            <ul>
                <li><strong>Refer a Friend:</strong> Earn $10 for each friend you refer who joins and spends at least 50 hours on ChatHub.</li>
                <li><strong>Participate in Surveys:</strong> Provide valuable feedback through occasional surveys and earn rewards.</li>
                <li><strong>Join Promotional Events:</strong> Earn rewards by participating in special events and promotions hosted by ChatHub.</li>
            </ul>
            <p>
                We are constantly looking for new and exciting ways to reward our users. Stay tuned for updates and additional earning opportunities!
            </p>
        </div>
    );
}

export default Earn;
