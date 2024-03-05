
import * as readline from 'readline';

import { waitTwoSeconds } from './utils/awaitHelper';
import { getMetaAPIRequest } from './api';
import { ErrorMessage, handleError } from './handleError';

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
    let consecutiveCounter = 0

    //requesting for 1000 times at a inverval of 2s
    //It will use an exponential backoff strategy to wait when rate limit is reached

    for (let i = 0; i < 1000; i++) {
        console.log(`request ${i + 1}`)

        try {
            const response = await getMetaAPIRequest(accessToken);
            console.log(response);

            consecutiveCounter = 0;
        } catch (error) {
            consecutiveCounter++;

            const errorMessage = await handleError(error, consecutiveCounter);

            if (errorMessage === ErrorMessage.authErrorMessage || errorMessage === ErrorMessage.otherErrorMessage) {
                console.log('the App was terminated due non rate-limiting error')
                break
            }
        }


    }
    rl.close();
}

export default runCli 