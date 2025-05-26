import axios from "axios";

const baseAuthUrl = "http://localhost:8082/trackitem/api/v1/auth";


const SignUpTask = async(signUp :any) =>{
    console.log(signUp)
    try{
        const signUpResponse = await axios.post(
            `${baseAuthUrl}/signup`,    
             signUp
        );
        console.log(signUpResponse.data.token)
        return signUpResponse.data.token
    }catch(err){
        console.error(err)
        throw err
    }
   
   

}

const LogInTask = async(logIn :any) =>{
    console.log(logIn)
    try{
        const signInResponse = await axios.post(
            `${baseAuthUrl}/signin`,    
             logIn
        );
        console.log(signInResponse.data.token)
        return signInResponse.data.token
    }catch(err){
        console.error(err)
        throw err
    }


}

export { LogInTask, SignUpTask}