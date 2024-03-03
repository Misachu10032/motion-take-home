
import * as readline from 'readline';

import { waitTwoSeconds } from './utils/waitForTwoSeconds';
import { makeAPICallAndLogResponse } from './task';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const getAccessToken = (): Promise<string> => {
    return new Promise((resolve) => {
        rl.question("what is your Meta access token", (answer) => {
            resolve(answer);
        });
    });
}


const runCli = async (): Promise<void> => {
    const accessToken = await getAccessToken();
    console.log(`Your accessToken is, ${accessToken}!`);

    //requesting for 10 times at a inverval of 2s for demonstration
    //I did not want a forever running app
    for (let i = 0; i < 10; i++) {
        console.log(`request ${i + 1}`)
        await makeAPICallAndLogResponse(accessToken)
        await waitTwoSeconds()
    }
    rl.close();
}

export default runCli 