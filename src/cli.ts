
import * as readline from 'readline';

import { waitForXSeconds } from './utils/awaitHelper';
import { SuccessResponse, getMetaAPIRequest } from './api';
import { writeToMongo } from './db';


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

    
    const callCountThreshHold = 20 //initialize the integer percentage of the total call can be used
    const criticalThreshold=80
    //The aim is the keep the app 
    // When reached 20%, variable call speed will be triggered
    let requestSpeed = 2

    for (let i = 0; i < 1000; i++) {
        console.log(`request ${i + 1}`)


        try {
            const response: SuccessResponse = await getMetaAPIRequest(accessToken);
            console.log(response.data);
            
            await writeToMongo(response.data)
            const newCallCount = response.callCount;
            if (newCallCount !== undefined) {
                if(newCallCount > callCountThreshHold){
                    //slow down if newCallCount exceed the threshold
                    requestSpeed++
        
                }
                
                else{
                    //reset the call speed to 2s 
                    requestSpeed=2
                    
                }
                
          
                console.log(`Your call_count is at ${newCallCount}, your next API call will happen in ${requestSpeed}s`);
            }

            await waitForXSeconds(requestSpeed)

        } catch (error) {
            console.log('The app was terminated due to some error')
            break
        }


    }
    rl.close();
}

export default runCli 