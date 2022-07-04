import {
    createUserWithEmailAndPassword,
    getRedirectResult,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithRedirect,
    signOut,
} from "firebase/auth";
import { authService } from "../firebase_config";

//앞서 생성한 config파일과 Firebase/auth로 부터 함수들을 import



//Email로 가입하는 함수
//동작이 이루어지면 앞서 작성한 로그인 상태 감지 함수로 인해 user정보가 변수에 저장되고 setState가 발생
export async function registerWithEamil(email, password) {
    try {
        await createUserWithEmailAndPassword(authService, email, password).then(
            (e) => {}
        );
    } catch (e) {
        return e.message.replace("Firebase: Error ", "");
    }
}


//Email로 로그인하는 함수
export async function loginWithEamil(email, password) {
    try {
        await signInWithEmailAndPassword(authService, email, password);
    } catch (e) {
        return e.message.replace("Firebase: Error ", "");
    }
}


//Google, Github로 로그인하는 함수
export async function loginWithSocial(provider) {
    if (provider === "google") {
        try {
            const provider = new GoogleAuthProvider();
            await new signInWithRedirect(authService, provider);
            const result = await getRedirectResult(authService);
            if (result) {
                // const user = result.user;
            }
            return;
        } catch (error) {
            return error;
        }
    } else if (provider === "github") {
        try {
            const provider = new GithubAuthProvider();

            await new signInWithRedirect(authService, provider);
            const result = await getRedirectResult(authService);
            if (result) {
                // const user = result.user;
            }
            return;
        } catch (error) {
            return error;
        }
    }
}



//Logout 하는 함수
export async function logout() {
    await signOut(authService);
    return;
}